import { useEffect } from "react";
import Link from "next/link";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authCheckState,
  showTweetMoreButtonState,
  spinnerState,
  tweetListState,
  userProfileState,
} from "src/atoms/atom";
import { getTweetsList } from "src/firebase/firestore/tweets/get/getTweetsList";
import { changeDateFormatAddTime } from "src/commonFunctions/changeDateFormat";
import Category from "../atoms/others/Category";
import { Divider } from "@material-ui/core";
import styles from "styles/components/block/tweetListArea.module.css";
import ListLikeButton from "../modules/buttons/ListLikeButton";
import UserPhoto from "../atoms/others/UserPhoto";

const TweetListArea = () => {
  // つぶやきリストのstate
  const [tweetList, setTweetList] = useRecoilState(tweetListState);
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);
  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);
  // ローディングの変更関数
  const setRunning = useSetRecoilState(spinnerState);
  // もっと見るボタン表示の変更関数
  const setShowMoreButton = useSetRecoilState(showTweetMoreButtonState);

  // いいね後につぶやきリストを更新する関数
  const updateTweetList = (likeDocId: string) => {
    const newDataList = tweetList.map((data) => {
      if (data.tweetId === likeDocId) {
        const newData = {
          ...data,
          numberOfLikes: data.numberOfLikes + 1,
          userLike: true,
        };
        return newData;
      } else {
        return data;
      }
    });
    setTweetList(newDataList);
  };

  useEffect(() => {
    if (tweetList.length === 0) {
      setRunning(true);
    }
    // 恋愛相談リストを取得する関数
    const get = async (userId: string) => {
      const data = await getTweetsList(userId);
      if (data) {
        setTweetList(data);
        setRunning(false);
      }
    };
    // authCheckがtrueになっていて、つぶやきリストが空の場合に動作する
    if (!tweetList.length && authCheck) {
      get(userProfile.id);
      // もっと見るボタンの表示
      setShowMoreButton(true);
    }
  }, [authCheck]);

  return (
    <div>
      <Divider />
      {tweetList.map((tweet) => (
        <div key={tweet.tweetId}>
          <div className={styles.tweetArea}>
            <div className={styles.tweetTop}>
              <div className={styles.userArea}>
                <UserPhoto
                  photoURL={tweet.user.photoURL}
                  width={30}
                  height={30}
                  userId={tweet.user.id}
                />
                <div className={styles.userName}>{tweet.user.name}</div>
              </div>
              <div className={styles.date}>
                {changeDateFormatAddTime(tweet.createdAt)}
              </div>
            </div>
            <p>
              {tweet.content.length <= 100
                ? tweet.content
                : tweet.content.slice(0, 100) + "..."}
            </p>
            <Link href={`/tweets/${tweet.tweetId}`}>
              <a className={styles.detailLink}>詳しく見る</a>
            </Link>
            <div>
              <Category categoryLabel={tweet.category} />
            </div>
            <div className={styles.likeAndSolution}>
              <div className={styles.likeAndComment}>
                <div className={styles.likeButtonArea}>
                  {tweet.userLike ? (
                    <div>
                      <FavoriteIcon color="primary" />
                    </div>
                  ) : (
                    <ListLikeButton
                      userId={tweet.user.id}
                      collectionId="tweets"
                      docId={tweet.tweetId}
                      userProfile={userProfile}
                      updateList={updateTweetList}
                    />
                  )}
                  <div className={styles.likeCount}>{tweet.numberOfLikes}</div>
                </div>
                <div className={styles.numberOfCommentArea}>
                  <div className={styles.commentIcon}>
                    <InsertCommentOutlinedIcon />
                  </div>
                  <div className={styles.commentCount}>
                    {tweet.numberOfComments}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default TweetListArea;
