import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import BasicTextField from "../../atoms/input/BasicTextField";
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
import { sendVerificationEmail } from "src/firebase/authentication/sendVerificationEmail";
import { signUpEmailAndPassword } from "src/firebase/authentication/signUpEmailAndPassword";
import PasswordField, {
  PasswordState,
} from "src/components/atoms/input/PasswordField";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& > *": {
        padding: "7px 80px",
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
          <BasicTextField
            label="ユーザー名"
            type="text"
            value={name}
            setValue={setName}
            error={inputError.name}
            errorMessage={errorMessage.name}
            disabled={running}
          />
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
            placeholder="8文字以上"
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
