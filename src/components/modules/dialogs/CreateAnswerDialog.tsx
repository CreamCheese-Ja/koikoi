import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  answerListState,
  consultationListState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  numberOfAnswerState,
  postAnswerRunningState,
  userProfileState,
} from "src/atoms/atom";
import Button from "@material-ui/core/Button";
import BasicDialog from "../../atoms/dialogs/BasicDialog";
import MultilineTextField from "src/components/atoms/input/MultilineTextField";
import { userOperationPossibleCheck } from "src/common/userOperationPossibleCheck";
import { getIsAnswered } from "src/firebase/firestore/consultations/get/getIsAnswered";
import { createAnswer } from "src/firebase/firestore/consultations/write/createAnswer";
import { getNewAnswerData } from "src/firebase/firestore/consultations/get/getNewAnswerData";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";

type Props = {
  open: boolean;
  consultationId: string;
  openCloseDialog: () => void;
};

const CreateAnswerDialog = (props: Props) => {
  const { open, consultationId, openCloseDialog } = props;

  const [answer, setAnswer] = useState({
    text: "",
    errorStatus: false,
    errorMessage: "",
  });

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
  // 実行中のstate
  const [running, setRunning] = useRecoilState(postAnswerRunningState);

  // エラーのリセット
  useEffect(() => {
    setAnswer((answer) => ({
      ...answer,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [answer.text]);

  // 内容の消去
  const deleteContent = () => {
    setAnswer(() => ({
      text: "",
      errorStatus: false,
      errorMessage: "",
    }));
  };

  // 「回答する」ボタンを押下で動く
  const postAnswer = async () => {
    setRunning(() => true);
    if (answer.text !== "" && answer.text.length <= 1000) {
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
    <>
      <BasicDialog
        title="回答"
        open={open}
        onClick={openCloseDialog}
        content={
          <div>
            <div style={{ marginBottom: "10px" }}>
              <MultilineTextField
                label="内容"
                value={answer.text}
                setValue={setAnswer}
                error={answer.errorStatus}
                errorMessage={answer.errorMessage}
                disabled={running}
              />
              <div style={{ textAlign: "right" }}>
                <Button
                  color="primary"
                  onClick={deleteContent}
                  disabled={answer.text === "" || running}
                >
                  内容を消去
                </Button>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <ExecutionButton
                buttonLabel="回答する"
                disabled={running}
                onClick={postAnswer}
              />
            </div>
          </div>
        }
        running={running}
      />
    </>
  );
};

export default CreateAnswerDialog;
