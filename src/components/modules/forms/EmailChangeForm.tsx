import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
import BasicTextField from "src/components/atoms/input/BasicTextField";
import PasswordField from "src/components/atoms/input/PasswordField";
import { sendVerificationEmail } from "src/firebase/authentication/sendVerificationEmail";
import { updateEmail } from "src/firebase/authentication/updateEmail";

type Props = {
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  openAndCloseDialog: () => void;
};

const EmailChangeForm = (props: Props) => {
  const { running, setRunning, openAndCloseDialog } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });

  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // メールアドレス入力欄のエラーをリセット
  useEffect(() => {
    setInputError(false);
    setErrorMessage("");
  }, [email]);

  // メールアドレスの更新
  const changeEmail = async () => {
    setRunning(true);
    const result = await updateEmail(email, password.password);
    if (result === true) {
      // 確認メール送信
      const sendEmailResult = await sendVerificationEmail();
      if (sendEmailResult) {
        setSuccess({
          status: true,
          message:
            "確認メールを送信しました。メールを開き変更手続きを完了させてください。",
        });
        openAndCloseDialog();
      } else {
        setError({ status: true, message: "エラーが発生しました。" });
      }
    } else if (result === "reLogin") {
      setError({
        status: true,
        message: "エラーです。１度ログインし直してください。",
      });
    } else if (result !== false) {
      setInputError(true);
      setErrorMessage(result);
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
    }
    setRunning(false);
  };

  return (
    <>
      <p style={{ marginBottom: "10px" }}>
        新しいメールアドレスと現在のパスワードを入力してください。
      </p>
      <div style={{ textAlign: "center" }}>
        <BasicTextField
          label="新しいメールアドレス"
          type="email"
          value={email}
          setValue={setEmail}
          error={inputError}
          errorMessage={errorMessage}
          disabled={running}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <PasswordField
          error={false}
          errorMessage=""
          password={password}
          setPassword={setPassword}
          placeholder=""
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <ExecutionButton
          onClick={changeEmail}
          buttonLabel="変更する"
          disabled={running}
        />
      </div>
    </>
  );
};

export default EmailChangeForm;
