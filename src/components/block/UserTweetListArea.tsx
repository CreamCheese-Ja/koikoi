import { Divider } from "@material-ui/core";
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { changeDateFormatAddTime } from "src/commonFunctions/changeDateFormat";
import { getUserTweetList } from "src/firebase/firestore/tweets/get/getUserTweetList";
import { UserTweetList } from "src/type";
import styles from "styles/components/block/userListArea.module.css";
import Category from "../atoms/others/Category";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";

type Props = {
  userId: string;
  userTweetList: UserTweetList;
  setUserTweetList: Dispatch<SetStateAction<UserTweetList>>;
};

const UserTweetListArea = (props: Props) => {
  const { userId, userTweetList, setUserTweetList } = props;

  useEffect(() => {
    const getPage = async () => {
      const firstPage = await getUserTweetList(userId);
      if (firstPage) {
        setUserTweetList(firstPage);
      }
    };
    if (userTweetList.length === 0) {
      getPage();
    }
  }, []);

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
              </div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default UserTweetListArea;
