import React from "react";
import InputField from "./InputField";
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

const LoginForm = () => {
  const classes = useStyles();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [inputError, setInputError] = React.useState({
    email: false,
    password: false,
  });
  const [errorMessage, setErrorMessage] = React.useState({
    email: "",
    password: "",
  });

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
        <Button variant="contained" color="primary" className={classes.root}>
          ログイン
        </Button>
      </div>
    </>
  );
};

export default LoginForm;
