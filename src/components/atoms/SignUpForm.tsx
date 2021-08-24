import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import InputField from "./InputField";
import firebase from "../../firebase/firebase";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "styles/components/atoms/signUpForm.module.css";
import AlertMessage from "./AlertMessage";
import { useSetRecoilState, useRecoilState } from "recoil";
import { loginAndSignUpFormState, userProfileState } from "src/atoms/atom";

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

  // その他のエラー用のstate
  const [othersError, setOthersError] = useState(false);
  const [othersErrorMessage, setOthersErrorMessage] = useState("");

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

  // ユーザー名が使用できるかどうか確認するメソッド
  const sameNameVerification = async () => {
    try {
      const doc = await firebase
        .firestore()
        .collection("users")
        .where("name", "==", name)
        .get();
      if (doc.empty) {
        return true;
      } else {
        setInputError({ ...inputError, name: true });
        setErrorMessage({
          ...errorMessage,
          name: "このユーザー名は使用されています。",
        });
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  // firebaseAuthに新規アカウントを登録するメソッド
  const registerNewUser = async () => {
    // その他のエラーをリセット
    setOthersError(false);
    try {
      // 新規登録
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      // authのdisplayNameに名前を登録
      await updateDisplayName();

      // firestoreにプロフィール情報を登録
      await createNewProfile();

      // 確認メールの送信
      await emailConfirmation();

      // その他のエラーも出ていないことを確認し閉じる
      if (othersError === false) {
        // 新規登録フォームを閉じる
        setLoginAndSignUpForm({ ...loginAndSignUpForm, status: false });

        // メール確認フォームを開く
        props.openEmailConfirmationDialog();
      }
    } catch (error) {
      const errorCode = error.code;

      // errorLogに対してそれぞれの処理
      switch (errorCode) {
        case "auth/email-already-in-use":
          setInputError({ ...inputError, email: true });
          setErrorMessage({
            ...errorMessage,
            email: "このメールアドレスは既に使用されています。",
          });
          break;
        case "auth/invalid-email":
          setInputError({ ...inputError, email: true });
          setErrorMessage({
            ...errorMessage,
            email: "正しい形式で入力してください。",
          });
          break;
        case "auth/weak-password":
          setInputError({ ...inputError, password: true });
          setErrorMessage({
            ...errorMessage,
            password: "パスワードは6文字以上です。",
          });
          break;
        default:
          setOthersError(true);
          setOthersErrorMessage(
            "エラーが発生しました。もう1度やり直してください。"
          );
      }
    }
  };

  // firebaseAuthのdisplayNameを登録するメソッド
  const updateDisplayName = async () => {
    try {
      await firebase.auth().currentUser?.updateProfile({
        displayName: name,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // 確認メールを送信するメソッド
  const emailConfirmation = async () => {
    try {
      await firebase.auth().currentUser?.sendEmailVerification();
    } catch (error) {
      console.log(error.message);
    }
  };

  // firestoreにプロフィールを登録するメソッド
  const createNewProfile = async () => {
    const user = firebase.auth().currentUser!;
    try {
      firebase.firestore().doc(`users/${user.uid}`).set({
        name: name,
        photoURL: "noImage",
        gender: "未設定",
        age: "未設定",
        bloodType: "未設定",
        sign: "未設定",
        numberOfBestAnswer: 0,
        numberOfLikes: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      // userProfileStateにプロフィールデータをセット
      setUserProfile({
        name: name,
        photoURL: "noImage",
        gender: "未設定",
        age: "未設定",
        bloodType: "未設定",
        sign: "未設定",
        numberOfBestAnswer: 0,
        numberOfLikes: 0,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // 新規登録一連メソッド
  const signUpUser = async () => {
    props.setRunning(true);
    if (name !== "") {
      // ここでユーザー名の存在確認
      const register = await sameNameVerification();
      if (register && name.length <= 20) {
        // firebaseAuthに新規アカウントを登録
        await registerNewUser();
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
    props.setRunning(false);
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
          />
          <InputField
            label="メールアドレス"
            type="email"
            value={email}
            onChange={setEmail}
            error={inputError.email}
            errorMessage={errorMessage.email}
          />
          <InputField
            label="パスワード(6文字以上)"
            type="password"
            value={password}
            onChange={setPassword}
            error={inputError.password}
            errorMessage={errorMessage.password}
          />
        </div>
        <div className={styles.buttonArea}>
          <Button
            variant="contained"
            color="primary"
            className={classes.root}
            onClick={() => signUpUser()}
            disabled={props.running}
          >
            新規登録
          </Button>
        </div>
        <AlertMessage
          alert={othersError}
          setAlert={setOthersError}
          message={othersErrorMessage}
          warningType="error"
        />
      </div>
    </div>
  );
};

export default SignUpForm;
