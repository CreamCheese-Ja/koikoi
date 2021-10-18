import React, { Dispatch, SetStateAction } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  answerListState,
  consultationListState,
  defaultErrorAlertState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  numberOfAnswerState,
  postAnswerRunningState,
  userProfileState,
} from "src/atoms/atom";
import { userOperationPossibleCheck } from "src/commonFunctions/userOperationPossibleCheck";
import { checkExistsAnswer } from "src/firebase/firestore/consultations/get/checkExistsAnswer";
import { getNewAnswerData } from "src/firebase/firestore/consultations/get/getNewAnswerData";
import { createAnswer } from "src/firebase/firestore/consultations/write/createAnswer";
import BasicExecutionButton from "../../atoms/buttons/BasicExecutionButton";

type Field = {
  text: string;
  errorStatus: boolean;
  errorMessage: string;
};

type Props = {
  consultationId: string;
  openCloseDialog: () => void;
  answer: Field;
  setAnswer: Dispatch<SetStateAction<Field>>;
};

const PostAnswerButton = (props: Props) => {
  const { consultationId, openCloseDialog, answer, setAnswer } = props;

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);
  // 回答数のstate
  const setNumberOfAnswer = useSetRecoilState(numberOfAnswerState);
  // 回答リストのstate
  const [answerList, setAnswerList] = useRecoilState(answerListState);
  // 恋愛相談リストのstate
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );
  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);
  // デフォルトエラーの変更関数
  const setDefaultError = useSetRecoilState(defaultErrorAlertState);
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);
  // 実行中のstate
  const [running, setRunning] = useRecoilState(postAnswerRunningState);

  // 「回答する」ボタンを押下で動く
  const postAnswer = async () => {
    setRunning(() => true);
    if (answer.text !== "" && answer.text.length <= 1000) {
      // ユーザー操作が可能かどうかチェック
      const operationPossible = userOperationPossibleCheck(userProfile.name);
      if (typeof operationPossible !== "string") {
        // ここですでに投稿しているかどうかをチェックする。投稿していれば投稿させない
        const answerExists = await checkExistsAnswer(
          userProfile.id,
          consultationId
        );
        if (!answerExists) {
          // 回答を登録
          const create = await createAnswer(
            consultationId,
            userProfile.id,
            answer.text
          );
          if (create) {
            // 新規の回答を取得
            const newAnswerData = await getNewAnswerData(
              userProfile.id,
              consultationId
            );
            if (newAnswerData) {
              // 回答リストstateに追加
              setAnswerList([newAnswerData, ...answerList]);
              // 回答数stateをインクリメントする
              setNumberOfAnswer((numberOfAnswer) => numberOfAnswer + 1);
              // 恋愛相談リストの回答数を変更
              const newConsulList = consultationList.map((data) => {
                if (data.consultationId === consultationId) {
                  const newData = {
                    ...data,
                    numberOfAnswer: data.numberOfAnswer + 1,
                  };
                  return newData;
                } else {
                  return data;
                }
              });
              setConsultationList(newConsulList);
              // 回答内容フィールドを消す
              setAnswer({ text: "", errorStatus: false, errorMessage: "" });
              // ダイアログを閉じる
              openCloseDialog();
              // ※アンサーの数よりリストが少なかったらもっと見るボタンを表示(もっと見るのコンポーネントにて)
              setSuccess({ status: true, message: "投稿しました" });
            }
          } else {
            setDefaultError(true);
          }
        } else {
          setError({ status: true, message: "既に投稿しています。" });
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
      if (answer.text === "") {
        setAnswer((answer) => ({
          ...answer,
          errorStatus: true,
          errorMessage: "内容を入力してください。",
        }));
      } else {
        setAnswer((answer) => ({
          ...answer,
          errorStatus: true,
          errorMessage: "内容は1000文字以内です。",
        }));
      }
    }
    setRunning(() => false);
  };

  return (
    <div>
      <BasicExecutionButton
        buttonLabel="回答する"
        disabled={running}
        onClick={postAnswer}
      />
    </div>
  );
};

export default PostAnswerButton;
