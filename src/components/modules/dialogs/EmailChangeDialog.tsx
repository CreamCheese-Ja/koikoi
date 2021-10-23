import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import BasicTextField from "../../atoms/input/BasicTextField";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import styles from "styles/components/modules/dialogs/emailChangeDialog.module.css";
import firebase from "../../../firebase/firebase";
import Linear from "../../atoms/progress/Linear";
import { useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";

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

const EmailChangeDialog = () => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [inputError, setInputError] = useState({
    email: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
  });
  const [running, setRunning] = useState(false);

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // 入力欄のエラーをリセット
  useEffect(() => {
    setInputError({ ...inputError, email: false });
    setErrorMessage({
      ...errorMessage,
      email: "",
    });
  }, [email]);

  // メールアドレスを変更するメソッド
  const changeEmail = async () => {
    setError({ status: false, message: "" });
    setRunning(true);
    const user = firebase.auth().currentUser;
    try {
      await user!.updateEmail(email);
      setSuccess({ status: true, message: "メールアドレスを変更しました。" });
    } catch (error) {
      const e = error as firebase.FirebaseError;
      const errorCode = e.code;

      switch (errorCode) {
        case "auth/email-already-in-use":
          setInputError({ ...inputError, email: true });
          setErrorMessage({
            ...errorMessage,
            email: "このメールアドレスは既に使用されています。",
          });
          break;
        case "auth/invalid-email":
          setInputError({ ...inputError, email: true });
          setErrorMessage({
            ...errorMessage,
            email: "正しい形式で入力してください。",
          });
          break;
        case "auth/requires-recent-login":
          setError({
            status: true,
            message:
              "もう一度ログインする必要があります。ログアウトして再度ログインしてからお試しください。",
          });
          break;
        default:
          alert(errorCode);
          setError({ status: true, message: "エラーが発生しました。" });
      }
    } finally {
      setRunning(false);
    }
  };

  return (
    <>
      <Dialog
        open={false}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={running} />
        <DialogTitle id="alert-dialog-title">
          {"メールアドレスの変更"}
        </DialogTitle>
        <DialogContent>
          <BasicTextField
            label="メールアドレス"
            type="email"
            value={email}
            onChange={setEmail}
            error={inputError.email}
            errorMessage={errorMessage.email}
            disabled={running}
          />
          <div className={styles.changeButtonArea}>
            <Button
              variant="contained"
              color="primary"
              className={classes.root}
              onClick={changeEmail}
              disabled={running}
            >
              変更
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary">キャンセル</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmailChangeDialog;
