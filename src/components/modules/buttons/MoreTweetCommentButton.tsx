import { useState } from "react";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import {
  defaultErrorAlertState,
  getTweetCommentListRunningState,
} from "src/atoms/atom";
import BasicExecutionButton from "src/components/atoms/buttons/BasicExecutionButton";
import Spinner from "src/components/atoms/progress/Spinner";
import { getNextCommentList } from "src/firebase/firestore/tweets/get/getNextCommentList";
import { TweetCommentList } from "src/type";

type Props = {
  commentList: TweetCommentList;
  setCommentList: SetterOrUpdater<TweetCommentList>;
  tweetId: string;
  userProfileId: string;
};

const MoreTweetCommentButton = (props: Props) => {
  const { commentList, setCommentList, tweetId, userProfileId } = props;

  const [running, setRunning] = useRecoilState(getTweetCommentListRunningState);
  const [isButtonDisplay, setIsButtonDisplay] = useState(true);
  // 共通エラー用の変更関数
  const setError = useSetRecoilState(defaultErrorAlertState);

  const fetchNextPage = async () => {
    setRunning(true);
    // 次の10件を取得
    const nextPage = await getNextCommentList(
      tweetId,
      userProfileId,
      commentList[commentList.length - 1].createdAt
    );
    if (nextPage) {
      setCommentList([...commentList, ...nextPage]);
      // 取得数が10未満であればボタンを非表示にする
      if (nextPage.length !== 10) {
        setIsButtonDisplay(false);
      }
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

export default MoreTweetCommentButton;
