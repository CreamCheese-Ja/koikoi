import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  showTweetMoreButtonState,
  spinnerState,
  tweetListState,
  userProfileState,
} from "src/atoms/atom";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
import Spinner from "src/components/atoms/progress/Spinner";
import { getNextTweetList } from "src/firebase/firestore/tweets/get/getNextTweetList";

const MoreTweetButton = () => {
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);
  // つぶやきリストのstate
  const [tweetList, setTweetList] = useRecoilState(tweetListState);
  // エラーstate
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  // スピナーのstate
  const [running, setRunning] = useRecoilState(spinnerState);
  // もっと見るボタンの表示、非表示state
  const [showMoreButton, setShowMoreButton] = useRecoilState(
    showTweetMoreButtonState
  );

  const fetchNextPage = async () => {
    setRunning(true);
    // 次の10件を取得
    const nextPage = await getNextTweetList(
      userProfile.id,
      tweetList[tweetList.length - 1].createdAt
    );
    if (nextPage) {
      setTweetList([...tweetList, ...nextPage]);
      // 取得数が10未満であればボタンを非表示にする
      if (nextPage.length !== 10) {
        setShowMoreButton(false);
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
      ) : showMoreButton ? (
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

export default MoreTweetButton;
