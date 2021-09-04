import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  consultationContentState,
  consultationCategoryState,
  consultationTitleState,
  userProfileState,
  multipurposeErrorAlertState,
  defaultErrorAlertState,
  multipurposeSuccessAlertState,
  loginAndSignUpFormState,
  postConsultationRunning,
} from "src/atoms/atom";
import { userOperationPossibleCheck } from "src/commonFunctions/userOperationPossibleCheck";
import { createConsultation } from "src/firebase/firestore";
import BasicExecutionButton from "./BasicExecutionButton";

type Props = {
  handleClose: () => void;
};

const PostConsultationButton = (props: Props) => {
  const [category, setCategory] = useRecoilState(consultationCategoryState);
  const [title, setTitle] = useRecoilState(consultationTitleState);
  const [content, setContent] = useRecoilState(consultationContentState);

  const userProfile = useRecoilValue(userProfileState);

  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  const setDefaultError = useSetRecoilState(defaultErrorAlertState);

  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  // 実行中の変更関数
  const [running, setRunning] = useRecoilState(postConsultationRunning);

  // 投稿ボタンを押下した時に動く関数
  const postConsultation = async () => {
    setRunning(() => true);
    if (category.text !== "" && title.text !== "" && content.text !== "") {
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
        if (create !== "error") {
          // 投稿完了
          setSuccess({ status: true, message: create });
          setCategory((category) => ({ ...category, text: "" }));
          setTitle((title) => ({ ...title, text: "" }));
          setContent((content) => ({ ...content, text: "" }));
          props.handleClose();
        } else {
          setDefaultError(true);
        }
      } else if (operationPossible === "投稿にはログインが必要です。") {
        // ログインフォームを開く
        setLoginAndSignUpForm({ title: "ログイン", status: true });
        setError({ status: true, message: operationPossible });
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
