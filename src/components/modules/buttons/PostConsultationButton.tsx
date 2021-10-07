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
  consultationListState,
  postMenuState,
} from "src/atoms/atom";
import { userOperationPossibleCheck } from "src/commonFunctions/userOperationPossibleCheck";
import { getConsultationList } from "src/firebase/firestore/consultations/get/getConsultationList";
import { getNewConsultationData } from "src/firebase/firestore/consultations/get/getNewConsultationData";
import { createConsultation } from "src/firebase/firestore/consultations/write/createConsultation";
import BasicExecutionButton from "../../atoms/buttons/BasicExecutionButton";

type Props = {
  handleClose: () => void;
};

const PostConsultationButton = (props: Props) => {
  const [category, setCategory] = useRecoilState(consultationCategoryState);
  const [title, setTitle] = useRecoilState(consultationTitleState);
  const [content, setContent] = useRecoilState(consultationContentState);

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
        if (create !== "error") {
          // 投稿完了
          // 新規の投稿を取得
          const newData = await getNewConsultationData(create);
          if (typeof newData !== "string") {
            // 恋愛相談リストが空だった場合、最新の10件を取得する
            if (consultationList.length === 0) {
              const data = await getConsultationList(userProfile.id);
              if (typeof data !== "string") {
                setConsultationList(data);
              } else {
                setDefaultError(true);
              }
            } else {
              // 新規の投稿を恋愛相談リストに追加
              setConsultationList([newData, ...consultationList]);
            }
            // 投稿完了操作
            setSuccess({ status: true, message: "投稿しました。" });
            setCategory((category) => ({ ...category, text: "" }));
            setTitle((title) => ({ ...title, text: "" }));
            setContent((content) => ({ ...content, text: "" }));
            props.handleClose();
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
