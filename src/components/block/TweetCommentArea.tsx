import { Divider } from "@material-ui/core";
import { useEffect } from "react";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authCheckState,
  getTweetCommentListRunningState,
  tweetCommentCountState,
  tweetCommentListState,
  userProfileState,
} from "src/atoms/atom";
import { getCommentList } from "src/firebase/firestore/tweets/get/getCommentList";
import { changeDateFormatAddTime } from "src/commonFunctions/changeDateFormat";
import TweetCommentLikeButton from "../modules/buttons/TweetCommentLikeButton";
import styles from "styles/components/block/answerArea.module.css";
import MoreTweetCommentButton from "../modules/buttons/MoreTweetCommentButton";

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
    <div>
      <h2 className={styles.areaTitle}>コメント({tweetCommentCount}件)</h2>
      <Divider />
      <div>
        {tweetCommentList.map((comment) => (
          <div key={comment.commentId}>
            <div className={styles.answerArea}>
              <div className={styles.answerTop}>
                <div className={styles.userArea}>
                  {comment.user.photoURL === "noImage" ? (
                    <Image src={noProfile} width={30} height={30} />
                  ) : (
                    <Image src={comment.user.photoURL} width={30} height={30} />
                  )}
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
        <MoreTweetCommentButton
          commentList={tweetCommentList}
          setCommentList={setTweetCommentList}
          tweetId={tweetId}
          userProfileId={userProfile.id}
        />
      </div>
    </div>
  );
};

export default TweetCommentArea;
