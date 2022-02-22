import { useState } from "react";
import Router from "next/router";
import Image from "next/image";
import googleSignIn from "public/images/googleSignin.png";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@material-ui/core";
import LoginForm from "../forms/LoginForm";
import SignUpForm from "../forms/SignUpForm";
import styles from "styles/components/modules/dialogs/LoginAndSignUpFormDialog.module.css";
import EmailConfirmationDialog from "./EmailConfirmationDialog";
import Linear from "../../atoms/progress/Linear";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  loginAndSignUpFormState,
  passwordChangeDialogState,
} from "src/atoms/atom";
import { useSocialLogin } from "src/hooks/useSocialLogin";

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

  // 利用規約ページに遷移
  const pushTerms = () => {
    Router.push("/support/terms");
    setLoginAndSignUpForm({ ...loginAndSignUpForm, status: false });
  };

  const { googleLogin } = useSocialLogin();

  return (
    <>
      <Dialog
        open={loginAndSignUpForm.status}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={running} />
        <DialogTitle id="alert-dialog-title">
          <p className={styles.formTitle}>{loginAndSignUpForm.title}</p>
        </DialogTitle>
        <DialogContent>
          {loginAndSignUpForm.title === "ログイン" ? (
            <div>
              <LoginForm running={running} setRunning={setRunning} />
              {/* <div className={styles.socialLogin}>
                <Divider />
                <div className={styles.socialButtons}>
                  <Image
                    src={googleSignIn}
                    width={230}
                    height={56}
                    className={styles.socialButton}
                    onClick={googleLogin}
                  />
                </div>
              </div> */}
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
                  disabled={running}
                  onClick={() => {
                    setLoginAndSignUpForm({
                      ...loginAndSignUpForm,
                      title: "無料会員登録",
                    });
                  }}
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
              {/* <div className={styles.socialLogin}>
                <Divider />
                <div className={styles.socialButtons}>
                  <Image
                    src={googleSignIn}
                    width={230}
                    height={56}
                    className={styles.socialButton}
                    onClick={googleLogin}
                  />
                </div>
              </div> */}
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
                <div className={styles.caution}>
                  会員登録することで、
                  <span
                    className={styles.terms}
                    onClick={running ? () => {} : pushTerms}
                  >
                    利用規約
                  </span>
                  に同意したものとみなします。
                </div>
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
