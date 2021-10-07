import React, { useState } from "react";
import StarBorder from "@material-ui/icons/StarBorder";
import BasicAlertDialog from "../../modules/dialogs/BasicAlertDialog";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import {
  bestAnswerState,
  isSolutionState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import { writeBestAnswer } from "src/firebase/firestore/consultations/write/firestore";
import { AnswerList } from "src/type";

type Props = {
  consulId: string;
  answerId: string;
  answerUserId: string;
  answerList: AnswerList;
  setAnswerList: SetterOrUpdater<AnswerList>;
  answerComment: string;
};

const BestAnswerButton = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // ベストアンサーstateの変更関数
  const setBestAnswer = useSetRecoilState(bestAnswerState);

  // 解決済み、回答待ちstateの変更関数
  const setIsSolution = useSetRecoilState(isSolutionState);

  const dialogOpen = () => {
    setOpen(true);
  };

  const dialogClose = () => {
    setOpen(false);
  };

  // ベストアンサーを決定する関数
  const postBestAnswer = async () => {
    setRunning(true);
    // 返信コメントが入力されているかどうか
    if (props.answerComment === "") {
      setError({
        status: true,
        message: "ベストアンサーにするにはコメントを入力してください。",
      });
      setRunning(false);
      return;
    }
    // firestoreに書き込み
    const resultMessage = await writeBestAnswer(
      props.consulId,
      props.answerId,
      props.answerUserId
    );
    if (resultMessage !== "error") {
      // ベストアンサーstateの更新
      const bestAnswerData = props.answerList.find(
        (data) => data.answerId === props.answerId
      );
      setBestAnswer({ ...bestAnswerData, bestAnswer: true });
      // アンサーリストstateの更新
      const newAnswerList = props.answerList.filter((data) => {
        return data.answerId !== props.answerId;
      });
      props.setAnswerList(newAnswerList);
      setIsSolution(true);
      setSuccess({ status: true, message: resultMessage });
      dialogClose();
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
    }
    setRunning(false);
  };

  return (
    <div>
      <div onClick={dialogOpen}>
        <StarBorder style={{ cursor: "pointer" }} />
      </div>
      <BasicAlertDialog
        open={open}
        dialogClose={dialogClose}
        title="ベストアンサーにしますか？"
        content="ベストアンサーは１度決めると変更できません。この回答をベストアンサーに決めますか？"
        mainMethod={postBestAnswer}
        running={running}
      />
    </div>
  );
};

export default BestAnswerButton;
