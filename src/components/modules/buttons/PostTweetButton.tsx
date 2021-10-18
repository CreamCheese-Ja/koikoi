import React, { Dispatch, SetStateAction } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  postMenuState,
  tweetListState,
  userProfileState,
} from "src/atoms/atom";
import { userOperationPossibleCheck } from "src/commonFunctions/userOperationPossibleCheck";
import BasicExecutionButton from "src/components/atoms/buttons/BasicExecutionButton";
import { getNewTweetData } from "src/firebase/firestore/tweets/get/getNewTweetData";
import { createTweet } from "src/firebase/firestore/tweets/write/createTweet";

type Field = {
  text: string;
  errorStatus: boolean;
  errorMessage: string;
};

type Props = {
  handleClose: () => void;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  category: Field;
  content: Field;
  setCategory: Dispatch<SetStateAction<Field>>;
  setContent: Dispatch<SetStateAction<Field>>;
};

const PostTweetButton = (props: Props) => {
  const {
    handleClose,
    running,
    setRunning,
    category,
    content,
    setCategory,
    setContent,
  } = props;

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  // つぶやきリストのstate
  const [tweetList, setTweetList] = useRecoilState(tweetListState);

  // 投稿メニューの変更関数
  const setPostMenu = useSetRecoilState(postMenuState);

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
        if (typeof createResult === "string") {
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
      <BasicExecutionButton
        onClick={postTweet}
        buttonLabel="投稿する"
        disabled={running}
      />
    </>
  );
};

export default PostTweetButton;
