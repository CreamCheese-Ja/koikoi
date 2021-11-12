import { Dispatch, SetStateAction } from "react";
import BasicTextField from "../../atoms/input/BasicTextField";
import PasswordField from "src/components/atoms/input/PasswordField";
import { useSignUp } from "src/hooks/useSignUp";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";

type Props = {
  openEmailConfirmationDialog: () => void;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const SignUpForm = (props: Props) => {
  const { openEmailConfirmationDialog, running, setRunning } = props;
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    inputError,
    errorMessage,
    signUpUser,
  } = useSignUp(setRunning, openEmailConfirmationDialog);

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
          <ExecutionButton
            onClick={signUpUser}
            buttonLabel="新規登録"
            disabled={running}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
