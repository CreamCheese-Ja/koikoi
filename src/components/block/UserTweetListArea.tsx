import { Divider } from "@material-ui/core";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { changeDateFormatAddTime } from "src/common/changeDateFormat";
import { getUserTweetList } from "src/firebase/firestore/tweets/get/getUserTweetList";
import { UserTweetList } from "src/type";
import styles from "styles/components/block/userListArea.module.css";
import Category from "../atoms/others/Category";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import { SetterOrUpdater } from "recoil";
import { getNextUserTweetList } from "src/firebase/firestore/tweets/get/getNextUserTweetList";
import Spinner from "../atoms/progress/Spinner";
import ExecutionButton from "../atoms/buttons/ExecutionButton";
import DeleteButton from "../atoms/buttons/DeleteButton";

type Props = {
  userId: string;
  userTweetList: UserTweetList;
  setUserTweetList: Dispatch<SetStateAction<UserTweetList>>;
  isFetchTweet: boolean;
  setIsFetchTweet: Dispatch<SetStateAction<boolean>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  currentUserId: string;
  setError: SetterOrUpdater<{
    status: boolean;
    message: string;
  }>;
  openDeleteDialog: (id: string, postName: string) => void;
};

const UserTweetListArea = (props: Props) => {
  const {
    userId,
    userTweetList,
    setUserTweetList,
    isFetchTweet,
    setIsFetchTweet,
    running,
    setRunning,
    currentUserId,
    setError,
    openDeleteDialog,
  } = props;

  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    if (userTweetList.length === 0) {
      setRunning(true);
    }
    const getPage = async () => {
      const firstPage = await getUserTweetList(userId);
      if (firstPage) {
        setUserTweetList(firstPage);
      }
      setIsFetchTweet(true);
      setRunning(false);
    };
    if (!isFetchTweet) {
      getPage();
    }
  }, []);

  // 次のページ取得
  const fetchNextPage = async () => {
    setRunning(true);
    // 次の10件を取得
    const nextPage = await getNextUserTweetList(
      userId,
      userTweetList[userTweetList.length - 1].createdAt
    );
    if (nextPage) {
      setUserTweetList([...userTweetList, ...nextPage]);
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
    <div className={styles.container}>
      {userTweetList.map((tweet) => (
        <div key={tweet.tweetId}>
          <div className={styles.dataArea}>
            <p className={styles.date}>
              {changeDateFormatAddTime(tweet.createdAt)}
            </p>
            <p className={styles.tweetContent}>
              {tweet.content.length <= 100
                ? tweet.content
                : tweet.content.slice(0, 100) + "..."}
            </p>
            <div className={styles.tweetLinkArea}>
              <Link href={`/tweets/${tweet.tweetId}`}>
                <a className={styles.tweetLink}>詳しく見る</a>
              </Link>
            </div>
            <div>
              <Category categoryLabel={tweet.category} />
            </div>
            <div className={styles.pointAndSolutionArea}>
              <div className={styles.pointArea}>
                <div className={styles.point}>
                  <div>
                    <FavoriteBorderIcon
                      fontSize="small"
                      style={{ color: "#b0b0b0" }}
                    />
                  </div>
                  <div>{tweet.numberOfLikes}</div>
                </div>
                <div className={styles.point}>
                  <div className={styles.answerCount}>
                    <InsertCommentOutlinedIcon
                      fontSize="small"
                      style={{ color: "#b0b0b0" }}
                    />
                  </div>
                  <div>{tweet.numberOfComments}</div>
                </div>
                {currentUserId === userId ? (
                  <DeleteButton
                    onClick={() => openDeleteDialog(tweet.tweetId, "tweet")}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
      {userTweetList.length === 0 && isFetchTweet ? (
        <p className={styles.noneMessage}>つぶやきはありません</p>
      ) : (
        <div></div>
      )}
      <div className={styles.nextButton}>
        {running ? (
          <Spinner />
        ) : showMoreButton && userTweetList.length >= 10 ? (
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

export default UserTweetListArea;
