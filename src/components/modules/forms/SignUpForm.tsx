import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import InputField from "../../atoms/textFields/InputField";
import firebase from "../../../firebase/firebase";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useSetRecoilState, useRecoilState } from "recoil";
import {
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  userProfileState,
} from "src/atoms/atom";
import { getIsNameAvailable } from "src/firebase/firestore/users/get/getIsNameAvailable";
import { createNewProfile } from "src/firebase/firestore/users/write/createNewProfile";
import { updateDisplayName } from "src/firebase/authentication/updateDisplayName";
import { sendConfirmationEmail } from "src/firebase/authentication/sendConfirmationEmail";
import { signUpEmailAndPassword } from "src/firebase/authentication/signUpEmailAndPassword";

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
  openEmailConfirmationDialog: () => void;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const SignUpForm = (props: Props) => {
  const { openEmailConfirmationDialog, running, setRunning } = props;
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
  // ユーザープロフィール用の変更関数
  const setUserProfile = useSetRecoilState(userProfileState);
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
    // ①新規登録
    const isSignUpOrMessage = await signUpEmailAndPassword(email, password);
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
    if (isSignUpOrMessage === "パスワードは6文字以上です。") {
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
      if (isCreateNewProfile) {
        // userProfileStateにプロフィールデータをセット
        setUserProfile({
          id: userId,
          name: name,
          photoURL: "noImage",
          gender: "未設定",
          age: "未設定",
          job: "未設定",
          bloodType: "未設定",
          sign: "未設定",
          message: "",
          numberOfBestAnswer: 0,
          numberOfLikes: 0,
        });
      } else {
        setError({ status: true, message: "エラーが発生しました。" });
        return;
      }
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
      return;
    }

    // ④確認メールの送信
    const isSendConfirmationEmail = await sendConfirmationEmail();
    if (!isSendConfirmationEmail) {
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
    if (name !== "") {
      // ここでユーザー名の存在確認
      const isNameAvailable = await getIsNameAvailable(name);
      if (!isNameAvailable) {
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
      } else if (name.length >= 20) {
        setInputError({ ...inputError, name: true });
        setErrorMessage({
          ...errorMessage,
          name: "ユーザー名は20文字以内で決めてください。",
        });
      }
    } else {
      if (name === "") {
        setInputError({ ...inputError, name: true });
        setErrorMessage({
          ...errorMessage,
          name: "ユーザー名が未入力です。",
        });
      }
    }
    setRunning(false);
  };

  return (
    <div>
      <div>
        <div>
          <InputField
            label="ユーザー名"
            type="text"
            value={name}
            onChange={setName}
            error={inputError.name}
            errorMessage={errorMessage.name}
            disabled={running}
          />
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
            label="パスワード(6文字以上)"
            type="password"
            value={password}
            onChange={setPassword}
            error={inputError.password}
            errorMessage={errorMessage.password}
            disabled={running}
          />
        </div>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.root}
            onClick={() => signUpUser()}
            disabled={running}
          >
            新規登録
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
