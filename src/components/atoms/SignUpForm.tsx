import React from "react";
import InputField from "./InputField";
import firebase from "../../firebase/firebase";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "styles/components/atoms/signUpForm.module.css";

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

const SignUpForm = () => {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [inputError, setInputError] = React.useState({
    name: false,
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const signUpUser = async (email: string, password: string) => {
    try {
      if (name !== "") {
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);
        // ここで名前と画像を設定する
        await firebase.auth().currentUser?.sendEmailVerification();
        alert("登録成功");
        console.log(userCredential);
        console.log(userCredential.user);
      } else {
        if (name === "") {
          setInputError({ ...inputError, name: true });
          setErrorMessage({
            ...errorMessage,
            name: "ユーザー名が未入力です。",
          });
        }
      }
    } catch (error) {
      const errorCode = error.code;
      alert(errorCode);
      switch (errorCode) {
        case "auth/email-already-in-use":
          setInputError({ ...inputError, email: true });
          setErrorMessage({
            ...errorMessage,
            email: "このメールアドレスは既に使用されています。",
          });
        case "auth/invalid-email":
          setInputError({ ...inputError, email: true });
          setErrorMessage({
            ...errorMessage,
            email: "正しい形式で入力してください。",
          });
        case "auth/weak-password":
          setInputError({ ...inputError, password: true });
          setErrorMessage({
            ...errorMessage,
            password: "パスワードは6文字以上です。",
          });
      }
    }
  };

  return (
    <div>
      <div>
        <div className={styles.textFieldArea}>
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
            onClick={() => signUpUser(email, password)}
          >
            新規登録
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
