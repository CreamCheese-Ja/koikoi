import React, { useCallback } from "react";
import { ProfileItem } from "src/type";
import UserPhoto from "../atoms/others/UserPhoto";
import styles from "styles/components/block/profileArea.module.css";
import BasicButton from "../atoms/buttons/BasicButton";
import { useRecoilValue } from "recoil";
import { userProfileState } from "src/atoms/atom";

type Props = {
  userData: ProfileItem;
};

const ProfileArea = (props: Props) => {
  const {
    id,
    name,
    photoURL,
    gender,
    age,
    job,
    bloodType,
    sign,
    message,
    numberOfLikes,
    numberOfBestAnswer,
  } = props.userData;
  // ユーザー情報
  const userProfile = useRecoilValue(userProfileState);

  const editProfile = useCallback(() => {}, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{name}</h1>
      <div className={styles.photoArea}>
        <UserPhoto
          photoURL={props.userData.photoURL}
          width={150}
          height={150}
        />
      </div>
      <div className={styles.pointArea}>
        <div className={styles.like}>
          <div className={styles.count}>{numberOfLikes}</div>
          <div>いいね</div>
        </div>
        <div className={styles.bestAnswer}>
          <div className={styles.count}>{numberOfBestAnswer}</div>
          <div>BA</div>
        </div>
      </div>
      <p>{message}</p>
      <div className={styles.detailArea}>
        <div>
          <span>性別:</span>
          {gender}
        </div>
        <div>
          <span>年齢:</span>
          {age}
        </div>
        <div>
          <span>職業:</span>
          {job}
        </div>
        <div>
          <span>血液型:</span>
          {bloodType}
        </div>
        <div>
          <span>星座:</span>
          {sign}
        </div>
      </div>
      {id === userProfile.id ? (
        <div className={styles.buttonArea}>
          <BasicButton
            onClick={editProfile}
            buttonLabel="プロフィールを編集する"
            variant="text"
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProfileArea;
