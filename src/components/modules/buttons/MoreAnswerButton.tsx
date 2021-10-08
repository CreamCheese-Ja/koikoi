import React, { useEffect, useState } from "react";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import {
  defaultErrorAlertState,
  isSolutionState,
  numberOfAnswerState,
} from "src/atoms/atom";
import BasicExecutionButton from "src/components/atoms/buttons/BasicExecutionButton";
import Spinner from "src/components/atoms/progress/Spinner";
import { getNextAnswerList } from "src/firebase/firestore/consultations/get/getNextAnswerList";
import { AnswerList } from "src/type";

type Props = {
  answerList: AnswerList;
  setAnswerList: SetterOrUpdater<AnswerList>;
  consultationId: string;
  userProfileId: string;
};

const MoreAnswerButton = (props: Props) => {
  const [running, setRunning] = useState(false);
  const [isButtonDisplay, setIsButtonDisplay] = useState(false);
  // 回答数のstate
  const answerCount = useRecoilValue(numberOfAnswerState);
  // 解決済みかどうかのstate
  const isSolution = useRecoilValue(isSolutionState);
  // 共通エラー用の変更関数
  const setError = useSetRecoilState(defaultErrorAlertState);

  // もっと見るボタンの表示、非表示
  useEffect(() => {
    if (isSolution && props.answerList.length < answerCount - 1) {
      setIsButtonDisplay(true);
    } else if (!isSolution && props.answerList.length < answerCount) {
      setIsButtonDisplay(true);
    } else {
      setIsButtonDisplay(false);
    }
  }, [props.answerList]);

  // 次のページの取得
  const fetchNextPage = async () => {
    setRunning(true);
    // 次の5件を取得
    const nextPage = await getNextAnswerList(
      props.consultationId,
      props.userProfileId,
      props.answerList[props.answerList.length - 1].createdAt
    );
    if (nextPage) {
      props.setAnswerList([...props.answerList, ...nextPage]);
    } else {
      setError(true);
    }
    setRunning(false);
  };

  return (
    <>
      {running ? (
        <Spinner />
      ) : isButtonDisplay ? (
        <BasicExecutionButton
          onClick={fetchNextPage}
          buttonLabel="もっと見る"
          disabled={running}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MoreAnswerButton;
