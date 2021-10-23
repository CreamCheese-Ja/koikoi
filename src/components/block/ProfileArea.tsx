import React, { useCallback, useState } from "react";
import { ProfileItem } from "src/type";
import UserPhoto from "../atoms/others/UserPhoto";
import styles from "styles/components/block/profileArea.module.css";
import BasicButton from "../atoms/buttons/BasicButton";
import { useRecoilValue } from "recoil";
import { userProfileState } from "src/atoms/atom";
import BasicDialog from "../atoms/dialogs/BasicDialog";
import EditProfileForm from "../modules/forms/EditProfileForm";

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
  // プロフィール編集ダイアログ開閉
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // ダイアログ開閉
  const openCloseDialog = () => {
    setIsDialogOpen((isOpen) => !isOpen);
  };
  // プロフィール編集処理の実行
  const [editProfileRunning, setEditProfileRunning] = useState(false);

  return (
    <div className={styles.container}>
      <h1 className={styles.name}>{name}</h1>
      <div className={styles.photoArea}>
        <UserPhoto
          photoURL={userProfile.id === id ? userProfile.photoURL : photoURL}
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
      <p className={styles.message}>
        {userProfile.id === id ? userProfile.message : message}
      </p>
      <div className={styles.detailArea}>
        <div>
          <span>性別:</span>
          {userProfile.id === id ? userProfile.gender : gender}
        </div>
        <div>
          <span>年齢:</span>
          {userProfile.id === id ? userProfile.age : age}
        </div>
        <div>
          <span>職業:</span>
          {userProfile.id === id ? userProfile.job : job}
        </div>
        <div>
          <span>血液型:</span>
          {userProfile.id === id ? userProfile.bloodType : bloodType}
        </div>
        <div>
          <span>星座:</span>
          {userProfile.id === id ? userProfile.sign : sign}
        </div>
      </div>
      {userProfile.id === id ? (
        <div>
          <div className={styles.buttonArea}>
            <BasicButton
              onClick={openCloseDialog}
              buttonLabel="プロフィールを編集する"
              variant="text"
            />
          </div>
          <BasicDialog
            title="プロフィール編集"
            open={isDialogOpen}
            onClick={openCloseDialog}
            running={editProfileRunning}
            content={
              <EditProfileForm
                message={userProfile.message}
                gender={userProfile.gender}
                age={userProfile.age}
                job={userProfile.job}
                bloodType={userProfile.bloodType}
                sign={userProfile.sign}
                running={editProfileRunning}
              />
            }
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ProfileArea;
