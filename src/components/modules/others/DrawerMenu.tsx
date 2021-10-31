import clsx from "clsx";
import Router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Collapse, createStyles, IconButton, Theme } from "@material-ui/core";
import Image from "next/image";
import defaultUserImage from "public/images/defaultUserImage.png";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  passwordChangeDialogState,
  userProfileState,
  verificationEmailDialogState,
} from "src/atoms/atom";
import { Fragment, useState } from "react";
import styles from "styles/components/atoms/others/userPhoto.module.css";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { logoutApp } from "src/firebase/authentication/logoutApp";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const useSubStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(9),
    },
  })
);

const DrawerMenu = () => {
  const classes = useStyles();
  const subClasses = useSubStyles();

  const [showMenu, setShowMenu] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);

  // ユーザープロフィール用state
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);
  // パスワード変更ダイアログの開閉
  const setShowPasswordChange = useSetRecoilState(passwordChangeDialogState);
  // メールアドレス検証ダイアログの開閉
  const setShowVerificationEmail = useSetRecoilState(
    verificationEmailDialogState
  );
  // メールアドレス変更ダイアログの開閉
  // const setShowEmailChange = useSetRecoilState(emailChangeDialogState);

  const openCloseSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const openCloseDrawer = () => {
    setShowMenu((status) => !status);
  };

  // ログアウト処理
  const logout = async () => {
    const logoutResult = await logoutApp();
    if (logoutResult) {
      setUserProfile({
        id: "noUser",
        name: "",
        photoURL: "",
        gender: "",
        age: "",
        job: "",
        bloodType: "",
        sign: "",
        message: "",
        numberOfBestAnswer: 0,
        numberOfLikes: 0,
      });
      setSuccess({ status: true, message: "ログアウトしました。" });
      openCloseDrawer();
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
    }
  };

  // プロフィールページに移動
  const pushUserProfile = () => {
    Router.push(`/users/${userProfile.id}`);
    openCloseDrawer();
  };

  // パスワード変更ダイアログの開閉
  const openPasswordChangeDialog = () => {
    setShowPasswordChange((status) => !status);
  };

  // メールアドレス確認ダイアログの開閉
  const openEmailVerificationDialog = () => {
    setShowVerificationEmail((status) => !status);
  };

  // メールアドレス変更ダイアログの開閉
  // const openChangeEmailDialog = () => {
  //   setShowEmailChange((status) => !status);
  // };

  return (
    <div>
      <Fragment>
        <IconButton onClick={openCloseDrawer}>
          {userProfile.photoURL === "noImage" ? (
            <Image
              src={defaultUserImage}
              width={40}
              height={40}
              alt="userPhoto"
              className={styles.image}
            />
          ) : (
            <Image
              src={userProfile.photoURL}
              width={40}
              height={40}
              alt="userPhoto"
              className={styles.image}
            />
          )}
        </IconButton>
        <Drawer anchor="right" open={showMenu} onClose={openCloseDrawer}>
          <div className={clsx(classes.list, {})} role="presentation">
            <List>
              <ListItem button key="プロフィール" onClick={pushUserProfile}>
                <ListItemIcon>
                  <AccountCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="プロフィール" />
              </ListItem>
              <ListItem button key="設定" onClick={openCloseSubMenu}>
                <ListItemIcon>
                  <SettingsIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="設定" />
                {showSubMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={showSubMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    className={subClasses.nested}
                    onClick={openPasswordChangeDialog}
                  >
                    <ListItemText primary="パスワードの変更" />
                  </ListItem>
                  <ListItem
                    button
                    className={subClasses.nested}
                    onClick={openEmailVerificationDialog}
                  >
                    <ListItemText primary="メールアドレスの確認" />
                  </ListItem>
                </List>
              </Collapse>
              <ListItem button key="ログアウト" onClick={logout}>
                <ListItemIcon>
                  <ExitToAppIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="ログアウト" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </Fragment>
    </div>
  );
};

export default DrawerMenu;
