import { useState } from "react";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import {
  getTweetCommentListRunningState,
  multipurposeErrorAlertState,
} from "src/atoms/atom";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
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
  // エラーstate
  const setError = useSetRecoilState(multipurposeErrorAlertState);

  // ページ取得
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
      setError({ status: true, message: "ページを取得できませんでした。" });
    }
    setRunning(false);
  };

  return (
    <>
      {running ? (
        <Spinner />
      ) : isButtonDisplay && commentList.length === 10 ? (
        <ExecutionButton
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
