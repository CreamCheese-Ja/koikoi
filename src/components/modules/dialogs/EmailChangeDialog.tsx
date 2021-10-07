import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputField from "../../atoms/textFields/InputField";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import styles from "styles/components/modules/dialogs/emailChangeDialog.module.css";
import firebase from "../../../firebase/firebase";
import BasicAlert from "../../atoms/alerts/BasicAlert";
import Linear from "../../atoms/progress/Linear";

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
  const [success, setSuccess] = useState(false);
  const [running, setRunning] = useState(false);

  // その他のエラー用のstate
  const [othersError, setOthersError] = useState(false);
  const [othersErrorMessage, setOthersErrorMessage] = useState("");

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
    setOthersError(false);
    setRunning(true);
    const user = firebase.auth().currentUser;
    try {
      await user!.updateEmail(email);
    } catch (e) {
      const error = e as firebase.FirebaseError;
      const errorCode = error.code;

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
          setOthersError(true);
          setOthersErrorMessage(
            "もう一度ログインする必要があります。ログアウトして再度ログインしてからお試しください。"
          );
          break;
        default:
          alert(errorCode);
          setOthersError(true);
          setOthersErrorMessage("エラーが発生しました。");
          console.log(errorCode);
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
          <InputField
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
      <BasicAlert
        alert={success}
        setAlert={setSuccess}
        message="正常に変更完了しました。"
        warningType="success"
      />
      <BasicAlert
        alert={othersError}
        setAlert={setOthersError}
        message={othersErrorMessage}
        warningType="error"
      />
    </>
  );
};

export default EmailChangeDialog;
