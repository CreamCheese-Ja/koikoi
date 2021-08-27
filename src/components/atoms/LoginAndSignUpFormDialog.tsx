import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import styles from "styles/components/atoms/LoginAndSignUpFormDialog.module.css";
import EmailConfirmationDialog from "./EmailConfirmationDialog";
import Linear from "./progress/Linear";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  loginAndSignUpFormState,
  passwordChangeDialogState,
} from "src/atoms/atom";

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

  // パスワード変更ダイアログ開閉の変更関数
  const setPasswordChange = useSetRecoilState(passwordChangeDialogState);

  // パスワード変更ダイアログを開くメソッド
  const openPasswordChangeDialog = () => {
    setPasswordChange(true);
  };

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
              <LoginForm running={running} setRunning={setRunning} />
              <div className={styles.passwordMessage}>
                <Button
                  color="primary"
                  disabled={running}
                  onClick={openPasswordChangeDialog}
                >
                  パスワードをお忘れですか？
                </Button>
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
