import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  multipurposeSuccessAlertState,
  userProfileState,
} from "src/atoms/atom";
import firebase from "../../../firebase/firebase";
import { IconButton } from "@material-ui/core";
import Image from "next/image";
import styles from "styles/components/atoms/others/userPhoto.module.css";
import defaultUserImage from "public/images/defaultUserImage.png";
import Link from "next/link";

const UserMenu = () => {
  // ユーザーメニュー用のstate
  const [userMenu, setUserMenu] = useState<null | HTMLElement>(null);

  // ユーザープロフィール用state
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  // サクセスアラート
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // メニュー開閉
  const openUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenu(event.currentTarget);
  };
  const handleClose = () => {
    setUserMenu(null);
  };

  // ログアウト
  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUserProfile({
        id: "noUser",
        name: "",
        photoURL: "",
        gender: "",
        job: "",
        age: "",
        bloodType: "",
        sign: "",
        message: "",
        numberOfBestAnswer: 0,
        numberOfLikes: 0,
      });
      setSuccess({ status: true, message: "ログアウトしました。" });
      handleClose();
    } catch (error) {}
  };

  return (
    <div>
      {userProfile.photoURL === "noImage" ? (
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openUserMenu}
          style={{ borderRadius: "50%", overflow: "hidden" }}
        >
          <Image
            src={defaultUserImage}
            width={40}
            height={40}
            alt="userPhoto"
          />
        </IconButton>
      ) : (
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openUserMenu}
        >
          <Image
            src={userProfile.photoURL}
            width={40}
            height={40}
            alt="userPhoto"
            className={styles.image}
          />
        </IconButton>
      )}
      <Menu
        id="simple-menu"
        anchorEl={userMenu}
        keepMounted
        open={Boolean(userMenu)}
        onClose={handleClose}
      >
        <MenuItem>
          <Link href={`/users/${userProfile.id}`}>
            <a>マイページ</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>設定</MenuItem>
        <MenuItem onClick={logout}>ログアウト</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
