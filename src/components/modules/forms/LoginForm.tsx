import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import InputField from "../../atoms/textFields/InputField";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  defaultErrorAlertState,
  loginAlertState,
  loginAndSignUpFormState,
} from "src/atoms/atom";
import { loginEmailAndPassword } from "src/firebase/authentication/loginEmailAndPassword";

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
  const { running, setRunning } = props;
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

  // 共通のエラーアラート用の変更関数
  const setDefaultErrorAlert = useSetRecoilState(defaultErrorAlertState);

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
    setRunning(true);
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
      } else if (user !== "error") {
        setErrorMessage({ ...errorMessage, email: user });
        setInputError({ email: true, password: false });
      } else {
        setDefaultErrorAlert(true);
      }
    }
    setRunning(false);
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
        disabled={running}
      />
      <InputField
        label="パスワード"
        type="password"
        value={password}
        onChange={setPassword}
        error={inputError.password}
        errorMessage={errorMessage.password}
        disabled={running}
      />
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.root}
          onClick={loginUser}
          disabled={running}
        >
          ログイン
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
