import React, { Dispatch, SetStateAction } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import styles from "styles/components/atoms/LoginAndSignUpFormDialog.module.css";

type Props = {
  open: boolean;
  setFormName: Dispatch<SetStateAction<string>>;
  formName: string;
  handleClose: () => void;
};

const LoginAndSignUpFormDialog = (props: Props) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.formName}</DialogTitle>
        <DialogContent>
          {props.formName === "ログイン" ? (
            <div>
              <LoginForm />
              <div className={styles.passwordMessage}>
                <Button color="primary">パスワードをお忘れですか？</Button>
              </div>
              <div className={styles.loginAndSignUpMessage}>
                <Button
                  color="primary"
                  onClick={() => {
                    props.setFormName("新規登録");
                  }}
                >
                  新規登録はこちら
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <SignUpForm />
              <div className={styles.loginAndSignUpMessage}>
                <Button
                  color="primary"
                  onClick={() => {
                    props.setFormName("ログイン");
                  }}
                >
                  ログインはこちら
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginAndSignUpFormDialog;
