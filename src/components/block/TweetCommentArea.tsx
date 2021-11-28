import { Divider } from "@material-ui/core";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authCheckState,
  getTweetCommentListRunningState,
  tweetCommentCountState,
  tweetCommentListState,
  userProfileState,
} from "src/atoms/atom";
import { getCommentList } from "src/firebase/firestore/tweets/get/getCommentList";
import { changeDateFormatAddTime } from "src/common/changeDateFormat";
import TweetCommentLikeButton from "../modules/buttons/TweetCommentLikeButton";
import styles from "styles/components/block/answerArea.module.css";
import UserPhoto from "../atoms/others/UserPhoto";
import Spinner from "../atoms/progress/Spinner";
import ExecutionButton from "../atoms/buttons/ExecutionButton";
import { useGetNextTweetCommentList } from "src/hooks/useGetNextTweetCommentList";

type Props = {
  tweetId: string;
  numberOfComments: number;
};

const TweetCommentArea = (props: Props) => {
  const { tweetId, numberOfComments } = props;

  // コメントリストのstate
  const [tweetCommentList, setTweetCommentList] = useRecoilState(
    tweetCommentListState
  );
  // コメント数のstate
  const [tweetCommentCount, setTweetCommentCount] = useRecoilState(
    tweetCommentCountState
  );
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);
  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);
  // 実行中
  const setRunning = useSetRecoilState(getTweetCommentListRunningState);

  // 次ページ取得のhook
  const { running, isButtonDisplay, fetchNextPage } =
    useGetNextTweetCommentList(
      tweetCommentList,
      setTweetCommentList,
      tweetId,
      userProfile.id
    );

  useEffect(() => {
    // 最初にコメントリストを空にする
    setTweetCommentList([]);
    setTweetCommentCount(numberOfComments);
    setRunning(true);
    // 回答リストを取得する関数
    const get = async (docId: string, userId: string) => {
      const commentList = await getCommentList(docId, userId);
      if (commentList) {
        setTweetCommentList(commentList);
        setRunning(false);
      }
    };
    if (authCheck) {
      get(tweetId, userProfile.id);
    }
  }, [authCheck]);

  return (
    <div className={styles.container}>
      <h2 className={styles.areaTitle}>コメント({tweetCommentCount}件)</h2>
      <Divider />
      <div>
        {tweetCommentList.map((comment) => (
          <div key={comment.commentId}>
            <div className={styles.answerArea}>
              <div className={styles.answerTop}>
                <div className={styles.userArea}>
                  <UserPhoto
                    photoURL={comment.user.photoURL}
                    width={30}
                    height={30}
                    userId={comment.user.id}
                  />
                  <div className={styles.userName}>{comment.user.name}</div>
                </div>
                <div className={styles.date}>
                  {changeDateFormatAddTime(comment.createdAt)}
                </div>
              </div>
              <p className={styles.content}>{comment.content}</p>
              <div className={styles.likeAndAnswerArea}>
                <div className={styles.iconArea}>
                  <TweetCommentLikeButton
                    tweetId={tweetId}
                    commentId={comment.commentId}
                    likeUserId={comment.user.id}
                    userProfile={userProfile}
                    commentList={tweetCommentList}
                    setCommentList={setTweetCommentList}
                    userLike={comment.userLike}
                    numberOfLikes={comment.numberOfLikes}
                  />
                </div>
              </div>
            </div>
            <Divider />
          </div>
        ))}
      </div>
      <div className={styles.moreButtonArea}>
        {running ? (
          <Spinner />
        ) : isButtonDisplay && tweetCommentList.length >= 5 ? (
          <ExecutionButton
            onClick={fetchNextPage}
            buttonLabel="もっと見る"
            disabled={running}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default TweetCommentArea;
