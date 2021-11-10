import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import styles from "styles/components/modules/dialogs/EmailConfirmationDialog.module.css";
import firebase from "../../../firebase/firebase";
import Linear from "../../atoms/progress/Linear";
import { useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import { logoutApp } from "src/firebase/authentication/logoutApp";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& > *": {
        padding: "7px 70px",
        color: "white",
      },
    },
  })
);

type Props = {
  emailConfirmation: boolean;
  closeEmailConfirmationDialog: () => void;
};

const EmailConfirmationDialog = (props: Props) => {
  const { emailConfirmation, closeEmailConfirmationDialog } = props;

  const classes = useStyles();

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  const [running, setRunning] = useState(false);

  // メール確認をしたかどうかをチェックするメソッド
  const checkEmailVerified = async () => {
    // ユーザー情報を更新
    await firebase.auth().currentUser?.reload();
    // メール確認のチェック
    const user = firebase.auth().currentUser;
    if (user?.emailVerified) {
      // 確認完了後1度ログアウトする。emailの有効性確認トークンのセキュリティルールが弾かれるため。
      const logoutResult = await logoutApp();
      if (logoutResult) {
        closeEmailConfirmationDialog();
        setSuccess({
          status: true,
          message: "正常に登録完了しました。ログインをしてください。",
        });
      }
    } else {
      setError({
        status: true,
        message: "登録が完了していません。",
      });
    }
    setRunning(false);
  };

  // 登録完了ボタンクリック時の処理
  const clickRegisterButton = () => {
    setRunning(true);
    setTimeout(checkEmailVerified, 3000);
  };

  return (
    <>
      <Dialog
        open={emailConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={running} />
        <DialogTitle id="alert-dialog-title">
          <p className={styles.formTitle}>メールアドレスの確認</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            確認メールを送信しました。確認完了後、下記のボタンを押してください
          </DialogContentText>

          <div className={styles.verificationButtonArea}>
            <Button
              variant="contained"
              color="primary"
              className={classes.root}
              onClick={clickRegisterButton}
              disabled={running}
            >
              確認完了
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmailConfirmationDialog;
