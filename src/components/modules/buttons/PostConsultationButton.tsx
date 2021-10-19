import { Dispatch, SetStateAction } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  userProfileState,
  multipurposeErrorAlertState,
  defaultErrorAlertState,
  multipurposeSuccessAlertState,
  loginAndSignUpFormState,
  postConsultationRunning,
  consultationListState,
  postMenuState,
} from "src/atoms/atom";
import { userOperationPossibleCheck } from "src/common/userOperationPossibleCheck";
import { getNewConsultationData } from "src/firebase/firestore/consultations/get/getNewConsultationData";
import { createConsultation } from "src/firebase/firestore/consultations/write/createConsultation";
import BasicExecutionButton from "../../atoms/buttons/BasicExecutionButton";

type Field = {
  text: string;
  errorStatus: boolean;
  errorMessage: string;
};

type Props = {
  handleClose: () => void;
  category: Field;
  title: Field;
  content: Field;
  setCategory: Dispatch<SetStateAction<Field>>;
  setTitle: Dispatch<SetStateAction<Field>>;
  setContent: Dispatch<SetStateAction<Field>>;
};

const PostConsultationButton = (props: Props) => {
  const {
    handleClose,
    category,
    title,
    content,
    setCategory,
    setTitle,
    setContent,
  } = props;

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);
  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);
  // デフォルトエラーの変更関数
  const setDefaultError = useSetRecoilState(defaultErrorAlertState);
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);
  // 実行中のstate
  const [running, setRunning] = useRecoilState(postConsultationRunning);
  // 恋愛相談リストのstate
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );
  // 投稿メニューの変更関数
  const setPostMenu = useSetRecoilState(postMenuState);

  // 投稿ボタンを押下した時に動く関数
  const postConsultation = async () => {
    setRunning(() => true);
    if (
      category.text !== "" &&
      title.text !== "" &&
      content.text !== "" &&
      title.text.length <= 100 &&
      content.text.length <= 10000
    ) {
      // ユーザー操作が可能かどうかチェック
      const operationPossible = userOperationPossibleCheck(userProfile.name);
      if (typeof operationPossible !== "string") {
        // firestoreに書き込み
        const create = await createConsultation(
          category.text,
          title.text,
          content.text,
          userProfile.id
        );
        if (create) {
          // 恋愛相談リストが空ではない場合、新しいデータを取得
          if (consultationList.length !== 0) {
            const newData = await getNewConsultationData(create);
            if (newData) {
              setConsultationList([newData, ...consultationList]);
            }
            // 投稿完了操作
            setSuccess({ status: true, message: "投稿しました。" });
            setCategory((category) => ({ ...category, text: "" }));
            setTitle((title) => ({ ...title, text: "" }));
            setContent((content) => ({ ...content, text: "" }));
            handleClose();
            setPostMenu(null);
          } else {
            setDefaultError(true);
          }
        } else {
          setDefaultError(true);
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
    setRunning(() => false);
  };

  return (
    <>
      <BasicExecutionButton
        onClick={postConsultation}
        buttonLabel="投稿する"
        disabled={running}
      />
    </>
  );
};

export default PostConsultationButton;
