import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import { loginEmailAndPassword } from "src/firebase/authentication/loginEmailAndPassword";
import { PasswordState } from "src/components/atoms/input/PasswordField";

export const useLogin = (setRunning: Dispatch<SetStateAction<boolean>>) => {
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
    if (isLogionOrMessage === true) {
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

  return {
    email,
    setEmail,
    password,
    setPassword,
    inputError,
    errorMessage,
    loginUser,
  };
};
