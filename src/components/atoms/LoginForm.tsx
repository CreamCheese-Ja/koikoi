import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import InputField from "./InputField";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "styles/components/atoms/signUpForm.module.css";
import { loginEmailAndPassword } from "src/firebase/authentication";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginAlertState, loginAndSignUpFormState } from "src/atoms/atom";

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
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const LoginForm = (props: Props) => {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState({
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    password: "",
  });

  // ログイン、新規登録フォーム用のstate
  const [loginAndSignUpForm, setLoginAndSignUpForm] = useRecoilState(
    loginAndSignUpFormState
  );

  // ログインアラート用の変更関数
  const setLoginAlert = useSetRecoilState(loginAlertState);

  // それぞれの入力欄のエラーをリセット
  useEffect(() => {
    setInputError({ ...inputError, email: false });
    setErrorMessage({
      ...errorMessage,
      email: "",
    });
  }, [email]);

  useEffect(() => {
    setInputError({ ...inputError, password: false });
    setErrorMessage({
      ...errorMessage,
      password: "",
    });
  }, [password]);

  // ログイン一連メソッド
  const loginUser = async () => {
    props.setRunning(true);
    // ログイン処理
    const user = await loginEmailAndPassword(email, password);
    if (typeof user !== "string") {
      // ログイン成功時の処理
      setEmail("");
      setPassword("");
      setLoginAlert(true);
      setLoginAndSignUpForm({ ...loginAndSignUpForm, status: false });
    } else {
      // ログイン失敗時の処理
      if (user === "メールアドレスまたはパスワードが違います。") {
        setErrorMessage({ email: user, password: user });
        setInputError({ email: true, password: true });
      } else {
        setErrorMessage({ ...errorMessage, email: user });
        setInputError({ email: true, password: false });
      }
    }
    props.setRunning(false);
  };

  return (
    <>
      <InputField
        label="メールアドレス"
        type="email"
        value={email}
        onChange={setEmail}
        error={inputError.email}
        errorMessage={errorMessage.email}
      />
      <InputField
        label="パスワード"
        type="password"
        value={password}
        onChange={setPassword}
        error={inputError.password}
        errorMessage={errorMessage.password}
      />
      <div className={styles.buttonArea}>
        <Button
          variant="contained"
          color="primary"
          className={classes.root}
          onClick={loginUser}
          disabled={props.running}
        >
          ログイン
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
