import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  createTweetDialogState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  tweetListState,
  userProfileState,
} from "src/atoms/atom";
import Linear from "src/components/atoms/progress/Linear";
import styles from "styles/components/modules/dialogs/createConsulAndTweetDialog.module.css";
import SelectBox from "src/components/atoms/input/SelectBox";
import { categoryItem } from "src/common/selectItems";
import MultilineTextField from "src/components/atoms/input/MultilineTextField";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
import { userOperationPossibleCheck } from "src/common/userOperationPossibleCheck";
import { createTweet } from "src/firebase/firestore/tweets/write/createTweet";
import { getNewTweetData } from "src/firebase/firestore/tweets/get/getNewTweetData";

type Props = {
  setPostMenu: Dispatch<SetStateAction<HTMLElement | null>>;
};

const CreateTweetDialog = (props: Props) => {
  const { setPostMenu } = props;

  const [open, setOpen] = useRecoilState(createTweetDialogState);
  const [running, setRunning] = useState(false);

  const [category, setCategory] = useState({
    text: "",
    errorStatus: false,
    errorMessage: "",
  });

  const [content, setContent] = useState({
    text: "",
    errorStatus: false,
    errorMessage: "",
  });

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  // つぶやきリストのstate
  const [tweetList, setTweetList] = useRecoilState(tweetListState);

  useEffect(() => {
    setCategory((category) => ({
      ...category,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [category.text]);

  useEffect(() => {
    setContent((content) => ({
      ...content,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [content.text]);

  const handleClose = () => {
    setOpen(false);
  };

  // つぶやきを投稿する関数
  const postTweet = async () => {
    setRunning(true);
    if (
      category.text !== "" &&
      content.text !== "" &&
      content.text.length <= 300
    ) {
      // ユーザー操作が可能かどうかチェック
      const operationPossible = userOperationPossibleCheck(userProfile.name);
      if (typeof operationPossible !== "string") {
        const createResult = await createTweet(
          category.text,
          content.text,
          userProfile.id
        );
        if (createResult) {
          // つぶやきリストが空ではない場合、新しいデータを取得
          if (tweetList.length !== 0) {
            const newData = await getNewTweetData(createResult);
            if (newData) {
              setTweetList([newData, ...tweetList]);
            }
          }
          // 投稿完了操作
          setSuccess({ status: true, message: "投稿しました。" });
          setCategory((category) => ({ ...category, text: "" }));
          setContent((content) => ({ ...content, text: "" }));
          handleClose();
          setPostMenu(null);
          // つぶやきページにpush
          Router.push("/tweets");
        } else {
          setError({ status: true, message: "エラーが発生しました。" });
        }
      } else if (operationPossible === "ログインが必要です。") {
        // ログインフォームを開く
        setLoginAndSignUpForm({ title: "ログイン", status: true });
        setError({ status: true, message: `投稿には${operationPossible}` });
      } else if (
        operationPossible === "メールアドレスの確認が完了していません。"
      ) {
        setError({ status: true, message: operationPossible });
      }
    } else {
      if (category.text === "") {
        setCategory((category) => ({
          ...category,
          errorStatus: true,
          errorMessage: "カテゴリーを選択してください。",
        }));
      }
      if (content.text === "") {
        setContent((content) => ({
          ...content,
          errorStatus: true,
          errorMessage: "内容を入力してください。",
        }));
      }
      if (content.text.length > 10000) {
        setContent((content) => ({
          ...content,
          errorStatus: true,
          errorMessage: "内容は300文字以内です。",
        }));
      }
    }
    setRunning(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={running} />
        <DialogTitle id="alert-dialog-title">
          <p className={styles.title}>つぶやき</p>
        </DialogTitle>
        <DialogContent>
          <div className={styles.inputArea}>
            <SelectBox
              value={category.text}
              setValue={setCategory}
              error={category.errorStatus}
              errorMessage={category.errorMessage}
              disabled={running}
              selectLabel="カテゴリー"
              selectItem={categoryItem}
            />
          </div>
          <div className={styles.inputArea}>
            <MultilineTextField
              label="内容"
              value={content.text}
              setValue={setContent}
              error={content.errorStatus}
              errorMessage={content.errorMessage}
              disabled={running}
              rows={5}
            />
          </div>
          <div className={styles.buttonArea}>
            <ExecutionButton
              onClick={postTweet}
              buttonLabel="投稿する"
              disabled={running || !category.text || !content.text}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={running}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTweetDialog;
