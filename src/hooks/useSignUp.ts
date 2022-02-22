import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
} from "src/atoms/atom";
import { getIsNameAvailable } from "src/firebase/firestore/users/get/getIsNameAvailable";
import { createNewProfile } from "src/firebase/firestore/users/write/createNewProfile";
import { updateDisplayName } from "src/firebase/authentication/updateDisplayName";
import { sendVerificationEmail } from "src/firebase/authentication/sendVerificationEmail";
import { signUpEmailAndPassword } from "src/firebase/authentication/signUpEmailAndPassword";
import { PasswordState } from "src/components/atoms/input/PasswordField";
import firebase from "src/firebase/firebase";

export const useSignUp = (
  setRunning: Dispatch<SetStateAction<boolean>>,
  openEmailConfirmationDialog: () => void
) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState<PasswordState>({
    password: "",
    showPassword: false,
  });
  const [inputError, setInputError] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    password: "",
  });
  // 共通のエラーアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  // ログイン、新規登録フォーム用のstate
  const [loginAndSignUpForm, setLoginAndSignUpForm] = useRecoilState(
    loginAndSignUpFormState
  );

  // それぞれの入力欄のエラーをリセット
  useEffect(() => {
    setInputError({ ...inputError, name: false });
    setErrorMessage({
      ...errorMessage,
      name: "",
    });
  }, [name]);

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

  // firebaseAuthに新規アカウントを登録するメソッド(それぞれのcatchは一旦無視)
  const postNewUser = async () => {
    // 最初にブラウザ側でpasswordチェック(サーバー側だと6文字以上であれば通るため)
    if (password.password.length < 8) {
      setInputError({ ...inputError, password: true });
      setErrorMessage({
        ...errorMessage,
        password: "パスワードは8文字以上です。",
      });
      return;
    }
    // ①新規登録
    const isSignUpOrMessage = await signUpEmailAndPassword(
      email,
      password.password
    );
    if (isSignUpOrMessage === "このメールアドレスは既に使用されています。") {
      setInputError({ ...inputError, email: true });
      setErrorMessage({
        ...errorMessage,
        email: isSignUpOrMessage,
      });
      return;
    }
    if (isSignUpOrMessage === "正しい形式で入力してください。") {
      setInputError({ ...inputError, email: true });
      setErrorMessage({
        ...errorMessage,
        email: isSignUpOrMessage,
      });
      return;
    }
    if (isSignUpOrMessage === "パスワードは8文字以上です。") {
      setInputError({ ...inputError, password: true });
      setErrorMessage({
        ...errorMessage,
        password: isSignUpOrMessage,
      });
      return;
    }
    if (!isSignUpOrMessage) {
      setError({ status: true, message: "エラーが発生しました。" });
      return;
    }

    // ②authのdisplayNameに名前を登録(確認メールに名前を記述するために必要)
    const isUpdateDisplayName = await updateDisplayName(name);
    if (!isUpdateDisplayName) {
      setError({ status: true, message: "エラーが発生しました。" });
      return;
    }

    // ③firestoreにプロフィール情報を登録
    const userId = firebase.auth().currentUser?.uid;
    if (userId) {
      const isCreateNewProfile = await createNewProfile(userId, name);
      if (!isCreateNewProfile) {
        setError({ status: true, message: "エラーが発生しました。" });
        return;
      }
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
      return;
    }
    // ④確認メールの送信
    const resultSendVerificationEmail = await sendVerificationEmail();
    if (!resultSendVerificationEmail) {
      setError({ status: true, message: "エラーが発生しました。" });
      return;
    }
    // 新規登録フォームを閉じる
    setLoginAndSignUpForm({ ...loginAndSignUpForm, status: false });
    // メール確認フォームを開く
    openEmailConfirmationDialog();
  };

  // 新規登録一連メソッド
  const signUpUser = async () => {
    setRunning(true);

    // ユーザー名の存在確認
    const isNameAvailable = await getIsNameAvailable(name);
    if (isNameAvailable) {
      setInputError({ ...inputError, name: true });
      setErrorMessage({
        ...errorMessage,
        name: "このユーザー名は使用されています。",
      });
      setRunning(false);
      return;
    }
    if (name.length <= 20) {
      // firebaseAuthに新規アカウントを登録
      await postNewUser();
    } else if (name.length > 20) {
      setInputError({ ...inputError, name: true });
      setErrorMessage({
        ...errorMessage,
        name: "ユーザー名は20文字以内で決めてください。",
      });
    }

    setRunning(false);
  };
  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    inputError,
    errorMessage,
    signUpUser,
  };
};
