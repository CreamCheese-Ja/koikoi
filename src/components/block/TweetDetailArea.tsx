import React, { useCallback, useState } from "react";
import { UserData } from "src/type";
import styles from "styles/consultation.module.css";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import Category from "../atoms/others/Category";
import { Divider } from "@material-ui/core";
import TweetDetailLikeButton from "../modules/buttons/TweetDetailLikeButton";
import { useRecoilValue } from "recoil";
import { userProfileState } from "src/atoms/atom";
import ShowTextFieldButton from "../atoms/buttons/ShowTextFieldButton";
import TweetCommentField from "../modules/textFields/TweetCommentField";

type Props = {
  user: UserData;
  tweetId: string;
  category: string;
  content: string;
  numberOfLikes: number;
  createdAt: string;
};

const TweetDetailArea = (props: Props) => {
  const { user, tweetId, category, content, numberOfLikes, createdAt } = props;
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);
  const [isShowField, setIsShowField] = useState(false);

  // コメント入力欄開閉
  const openAndCloseField = useCallback(() => {
    setIsShowField((isShowField) => !isShowField);
  }, [isShowField]);

  return (
    <div className={styles.container}>
      <div className={styles.dateAndUserArea}>
        <div className={styles.userArea}>
          {user.photoURL === "noImage" ? (
            <Image src={noProfile} width={30} height={30} />
          ) : (
            <Image src={user.photoURL} width={30} height={30} />
          )}
          <div className={styles.name}>{user.name}</div>
        </div>
        <div>{createdAt}</div>
      </div>
      <div className={styles.categoryAndSolution}>
        <div className={styles.category}>
          <Category categoryLabel={category} />
        </div>
      </div>
      <Divider />
      <div className={styles.content}>{content}</div>
      <div className={styles.likeAndSupplementArea}>
        <div className={styles.likeButtonArea}>
          <TweetDetailLikeButton
            numberOfLikes={numberOfLikes}
            docId={tweetId}
            userId={user.id}
            userProfile={userProfile}
          />
        </div>
        <div>
          <ShowTextFieldButton
            isShowField={isShowField}
            onClick={openAndCloseField}
            trueWord="入力欄を閉じる"
            falseWord="コメントする"
          />
        </div>
      </div>
      <div>
        <TweetCommentField
          isShowField={isShowField}
          tweetId={tweetId}
          userProfile={userProfile}
        />
      </div>
      <Divider />
    </div>
  );
};

export default TweetDetailArea;
