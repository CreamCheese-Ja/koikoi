import { useEffect, useState } from "react";
import {
  SetterOrUpdater,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  getAnswerListRunningState,
  isSolutionState,
  multipurposeErrorAlertState,
  numberOfAnswerState,
} from "src/atoms/atom";
import { getNextAnswerList } from "src/firebase/firestore/consultations/get/getNextAnswerList";
import { AnswerList } from "src/type";

export const useGetNextAnswerList = (
  answerList: AnswerList,
  setAnswerList: SetterOrUpdater<AnswerList>,
  consultationId: string,
  userProfileId: string
) => {
  const [running, setRunning] = useRecoilState(getAnswerListRunningState);
  const [isButtonDisplay, setIsButtonDisplay] = useState(false);
  // 回答数のstate
  const answerCount = useRecoilValue(numberOfAnswerState);
  // 解決済みかどうかのstate
  const isSolution = useRecoilValue(isSolutionState);
  // エラーstate
  const setError = useSetRecoilState(multipurposeErrorAlertState);

  // もっと見るボタンの表示、非表示
  useEffect(() => {
    if (isSolution && answerList.length < answerCount - 1) {
      setIsButtonDisplay(true);
    } else if (!isSolution && answerList.length < answerCount) {
      setIsButtonDisplay(true);
    } else {
      setIsButtonDisplay(false);
    }
  }, [answerList]);

  // 次のページの取得
  const fetchNextPage = async () => {
    setRunning(true);
    // 次の5件を取得
    const nextPage = await getNextAnswerList(
      consultationId,
      userProfileId,
      answerList[answerList.length - 1].createdAt
    );
    if (nextPage) {
      setAnswerList([...answerList, ...nextPage]);
    } else {
      setError({ status: true, message: "ページを取得できませんでした。" });
    }
    setRunning(false);
  };

  return { running, isButtonDisplay, fetchNextPage };
};
