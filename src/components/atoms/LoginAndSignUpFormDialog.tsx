import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import styles from "styles/components/atoms/LoginAndSignUpFormDialog.module.css";
import EmailConfirmationDialog from "./EmailConfirmationDialog";
import Linear from "./progress/Linear";
import { useRecoilState } from "recoil";
import { loginAndSignUpFormState } from "src/atoms/atom";

const LoginAndSignUpFormDialog = () => {
  // 確認メールDialog用のstate
  const [emailConfirmation, setEmailConfirmation] = useState(false);

  const openEmailConfirmationDialog = () => {
    setEmailConfirmation(true);
  };
  const closeEmailConfirmationDialog = () => {
    setEmailConfirmation(false);
  };

  // 処理中かどうかを判断するstate
  const [running, setRunning] = useState(false);

  // ログイン、新規登録フォーム用のstate
  const [loginAndSignUpForm, setLoginAndSignUpForm] = useRecoilState(
    loginAndSignUpFormState
  );

  return (
    <>
      <Dialog
        open={loginAndSignUpForm.status}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={running} />
        <DialogTitle id="alert-dialog-title">
          {loginAndSignUpForm.title}
        </DialogTitle>
        <DialogContent>
          {loginAndSignUpForm.title === "ログイン" ? (
            <div>
              <LoginForm />
              <div className={styles.passwordMessage}>
                <Button color="primary">パスワードをお忘れですか？</Button>
              </div>
              <div className={styles.loginAndSignUpMessage}>
                <Button
                  color="primary"
                  onClick={() => {
                    setLoginAndSignUpForm({
                      ...loginAndSignUpForm,
                      title: "無料会員登録",
                    });
                  }}
                  disabled={running}
                >
                  新規登録はこちら
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <SignUpForm
                openEmailConfirmationDialog={openEmailConfirmationDialog}
                running={running}
                setRunning={setRunning}
              />
              <div className={styles.loginAndSignUpMessage}>
                <Button
                  color="primary"
                  onClick={() => {
                    setLoginAndSignUpForm({
                      ...loginAndSignUpForm,
                      title: "ログイン",
                    });
                  }}
                  disabled={running}
                >
                  ログインはこちら
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setLoginAndSignUpForm({ ...loginAndSignUpForm, status: false });
            }}
            color="primary"
            disabled={running}
          >
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
      <EmailConfirmationDialog
        emailConfirmation={emailConfirmation}
        closeEmailConfirmationDialog={closeEmailConfirmationDialog}
      />
    </>
  );
};

export default LoginAndSignUpFormDialog;
