import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  logoutAlertState,
  userMenuState,
  userProfileState,
} from "src/atoms/atom";
import firebase from "../../firebase/firebase";

const UserMenu = () => {
  // ユーザーメニュー用のstate
  const [userMenu, setUserMenu] = useRecoilState(userMenuState);

  // ユーザープロフィール用の変更関数
  const setUserProfile = useSetRecoilState(userProfileState);

  // ログアウトアラート用の変更関数
  const setLogout = useSetRecoilState(logoutAlertState);

  const handleClose = () => {
    setUserMenu(null);
  };

  const logout = async () => {
    try {
      await firebase.auth().signOut();
      setUserProfile({
        name: "",
        photoURL: "",
        gender: "",
        age: "",
        bloodType: "",
        sign: "",
        numberOfBestAnswer: 0,
        numberOfLikes: 0,
      });
      setLogout(true);
      handleClose();
    } catch (error) {}
  };

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={userMenu}
        keepMounted
        open={Boolean(userMenu)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logout}>ログアウト</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
