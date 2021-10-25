import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import BasicTextField from "../../atoms/input/BasicTextField";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import { loginEmailAndPassword } from "src/firebase/authentication/loginEmailAndPassword";
import PasswordField, {
  PasswordState,
} from "src/components/atoms/input/PasswordField";

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
  const [password, setPassword] = useState<PasswordState>({
    password: "",
    showPassword: false,
  });

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

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

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
    const isLogionOrMessage = await loginEmailAndPassword(
      email,
      password.password
    );
    if (typeof isLogionOrMessage === "boolean" && isLogionOrMessage) {
      // ログイン成功時の処理
      setEmail("");
      setPassword({ ...password, password: "" });
      setSuccess({ status: true, message: "ログインしました。" });
      setLoginAndSignUpForm({ ...loginAndSignUpForm, status: false });
    } else {
      // ログイン失敗時の処理
      if (isLogionOrMessage === "メールアドレスまたはパスワードが違います。") {
        setErrorMessage({
          email: isLogionOrMessage,
          password: isLogionOrMessage,
        });
        setInputError({ email: true, password: true });
      } else if (typeof isLogionOrMessage === "string") {
        setErrorMessage({ ...errorMessage, email: isLogionOrMessage });
        setInputError({ email: true, password: false });
      } else {
        setError({ status: true, message: "エラーが発生しました。" });
      }
    }
    setRunning(false);
  };

  return (
    <>
      <BasicTextField
        label="メールアドレス"
        type="email"
        value={email}
        setValue={setEmail}
        error={inputError.email}
        errorMessage={errorMessage.email}
        disabled={running}
      />
      <PasswordField
        error={inputError.password}
        errorMessage={errorMessage.password}
        password={password}
        setPassword={setPassword}
        placeholder=""
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
