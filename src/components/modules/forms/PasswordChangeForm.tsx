import { Dispatch, SetStateAction, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
import BasicTextField from "src/components/atoms/input/BasicTextField";
import { sendPasswordResetEmail } from "src/firebase/authentication/sendPasswordResetEmail";

type Props = {
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  openAndCloseDialog: () => void;
};

const PasswordChangeForm = (props: Props) => {
  const { running, setRunning, openAndCloseDialog } = props;
  const [email, setEmail] = useState("");

  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // パスワード再設定メールの送信メソッド
  const sendPasswordChangeEmail = async () => {
    setRunning(true);
    const result = await sendPasswordResetEmail(email);
    if (result === true) {
      setEmail("");
      setSuccess({ status: true, message: "再設定メールを送信しました。" });
      setEmail("");
      setErrorMessage("");
      setInputError(false);
      openAndCloseDialog();
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
        入力されたメールアドレス宛に、パスワードの再設定メールを送信します。
      </p>
      <div style={{ textAlign: "center" }}>
        <BasicTextField
          label="メールアドレス"
          type="email"
          value={email}
          setValue={setEmail}
          error={inputError}
          errorMessage={errorMessage}
          disabled={running}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <ExecutionButton
          onClick={sendPasswordChangeEmail}
          buttonLabel="送信する"
          disabled={running || !email}
        />
      </div>
    </>
  );
};

export default PasswordChangeForm;
