import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Router from "next/router";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  consultationListState,
  createConsultationDialogState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  postConsultationRunning,
  userProfileState,
} from "src/atoms/atom";
import styles from "styles/components/modules/dialogs/createConsulAndTweetDialog.module.css";
import Linear from "../../atoms/progress/Linear";
import SelectBox from "src/components/atoms/input/SelectBox";
import { categoryItem } from "src/common/selectItems";
import MultilineTextField from "src/components/atoms/input/MultilineTextField";
import { userOperationPossibleCheck } from "src/common/userOperationPossibleCheck";
import { createConsultation } from "src/firebase/firestore/consultations/write/createConsultation";
import { getNewConsultationData } from "src/firebase/firestore/consultations/get/getNewConsultationData";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";

type Props = {
  setPostMenu: Dispatch<SetStateAction<HTMLElement | null>>;
};

const CreateConsultationDialog = (props: Props) => {
  const { setPostMenu } = props;

  const [open, setOpen] = useRecoilState(createConsultationDialogState);

  const [category, setCategory] = useState({
    text: "",
    errorStatus: false,
    errorMessage: "",
  });
  const [title, setTitle] = useState({
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
  // 実行中のstate
  const [running, setRunning] = useRecoilState(postConsultationRunning);
  // 恋愛相談リストのstate
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );

  useEffect(() => {
    setCategory((category) => ({
      ...category,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [category.text]);

  useEffect(() => {
    setTitle((title) => ({
      ...title,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [title.text]);

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

  // 恋愛相談を投稿する関数
  const postConsultation = async () => {
    setRunning(true);
    if (title.text.length <= 100 && content.text.length <= 10000) {
      // ユーザー操作が可能かどうかチェック
      const operationPossible = userOperationPossibleCheck(userProfile.name);
      if (typeof operationPossible !== "string") {
        // firestoreに書き込み
        const createResult = await createConsultation(
          category.text,
          title.text,
          content.text,
          userProfile.id
        );
        if (createResult) {
          // 恋愛相談リストが空ではない場合、新しいデータを取得
          if (consultationList.length !== 0) {
            const newData = await getNewConsultationData(createResult);
            if (newData) {
              setConsultationList([newData, ...consultationList]);
            }
          }
          // 投稿完了操作
          setSuccess({ status: true, message: "投稿しました。" });
          setCategory((category) => ({ ...category, text: "" }));
          setTitle((title) => ({ ...title, text: "" }));
          setContent((content) => ({ ...content, text: "" }));
          handleClose();
          setPostMenu(null);
          // 恋愛相談ページにpush
          Router.push("/consultations");
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
      if (title.text === "") {
        setTitle((title) => ({
          ...title,
          errorStatus: true,
          errorMessage: "タイトルを入力してください。",
        }));
      }
      if (content.text === "") {
        setContent((content) => ({
          ...content,
          errorStatus: true,
          errorMessage: "内容を入力してください。",
        }));
      }
      if (title.text.length > 100) {
        setTitle((title) => ({
          ...title,
          errorStatus: true,
          errorMessage: "タイトルは100文字以内です。",
        }));
      }
      if (content.text.length > 10000) {
        setContent((content) => ({
          ...content,
          errorStatus: true,
          errorMessage: "内容は10000文字以内です。",
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
          <p className={styles.title}>恋愛相談</p>
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
              label="タイトル"
              value={title.text}
              setValue={setTitle}
              error={title.errorStatus}
              errorMessage={title.errorMessage}
              disabled={running}
              rows={0}
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
              onClick={postConsultation}
              buttonLabel="投稿する"
              disabled={
                running || !category.text || !title.text || !content.text
              }
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

export default CreateConsultationDialog;
