import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import styles from "styles/components/modules/dialogs/passwordChangeDialog.module.css";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  defaultErrorAlertState,
  passwordChangeDialogState,
} from "src/atoms/atom";
import InputField from "../../atoms/textFields/InputField";
import Linear from "../../atoms/progress/Linear";

import { useEffect } from "react";
import BasicAlert from "../../atoms/alerts/BasicAlert";
import { sendPasswordResetEmail } from "src/firebase/authentication/sendPasswordResetEmail";

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

const PasswordChangeDialog = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // パスワード変更ダイアログ開閉用のstate
  const [open, setOpen] = useRecoilState(passwordChangeDialogState);

  // 共通のエラーアラート用の変更関数
  const setDefaultErrorAlert = useSetRecoilState(defaultErrorAlertState);

  const [success, setSuccess] = useState(false);

  const [running, setRunning] = useState(false);

  useEffect(() => {
    setInputError(false);
    setErrorMessage("");
  }, [email]);

  const handleClose = () => {
    setEmail("");
    setErrorMessage("");
    setInputError(false);
    setOpen(false);
  };

  // パスワード再設定メールの送信メソッド
  const sendPasswordChangeEmail = async () => {
    setRunning(true);
    const result = await sendPasswordResetEmail(email);
    if (result) {
      setEmail("");
      setSuccess(true);
      handleClose();
    } else if (result !== false) {
      setInputError(true);
      setErrorMessage(result);
    } else {
      setDefaultErrorAlert(true);
    }
    setRunning(false);
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={running} />
        <DialogTitle id="alert-dialog-title">
          <p className={styles.formTitle}>パスワードの再設定</p>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            入力されたメールアドレス宛に、パスワードの再設定メールを送信します。
          </DialogContentText>
          <div className={styles.inputArea}>
            <InputField
              label="メールアドレス"
              type="email"
              value={email}
              onChange={setEmail}
              error={inputError}
              errorMessage={errorMessage}
              disabled={running}
            />
          </div>

          <div className={styles.changeButtonArea}>
            <Button
              variant="contained"
              color="primary"
              className={classes.root}
              onClick={sendPasswordChangeEmail}
              disabled={running}
            >
              送信する
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={running}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
      <BasicAlert
        alert={success}
        setAlert={setSuccess}
        message="再設定メールを送信しました。"
        warningType="success"
      />
    </>
  );
};

export default PasswordChangeDialog;
