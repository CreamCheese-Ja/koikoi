import { useState } from "react";
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  answerListState,
  consultationListState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  numberOfAnswerState,
  userProfileState,
} from "src/atoms/atom";
import { userOperationPossibleCheck } from "src/common/userOperationPossibleCheck";
import { getIsAnswered } from "src/firebase/firestore/consultations/get/getIsAnswered";
import { createAnswer } from "src/firebase/firestore/consultations/write/createAnswer";
import { getNewAnswerData } from "src/firebase/firestore/consultations/get/getNewAnswerData";

export const useCreateAnswer = (
  consultationId: string,
  openCloseField: () => void,
  setRunning: SetterOrUpdater<boolean>
) => {
  const [answer, setAnswer] = useState("");

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
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  // 「回答する」ボタンを押下で動く
  const postAnswer = async () => {
    setRunning(() => true);
    if (answer.length <= 1000) {
      // ユーザー操作が可能かどうかチェック
      const operationPossible = userOperationPossibleCheck(userProfile.name);
      if (typeof operationPossible !== "string") {
        // ここですでに投稿しているかどうかをチェックする。投稿していれば投稿させない
        const isAnswered = await getIsAnswered(userProfile.id, consultationId);
        if (!isAnswered) {
          // 回答を登録
          const create = await createAnswer(
            consultationId,
            userProfile.id,
            answer
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
              setAnswer("");
              // ダイアログを閉じる
              openCloseField();
              // ※アンサーの数よりリストが少なかったらもっと見るボタンを表示(もっと見るのコンポーネントにて)
              setSuccess({ status: true, message: "投稿しました" });
            }
          } else {
            setError({ status: true, message: "エラーが発生しました。" });
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
      setError({ status: true, message: "回答は1000文字以内です。" });
    }
    setRunning(() => false);
  };

  return { answer, setAnswer, postAnswer };
};
