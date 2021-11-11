import { Dispatch, SetStateAction } from "react";
import { useLogin } from "src/hooks/useLogin";
import PasswordField from "src/components/atoms/input/PasswordField";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
import BasicTextField from "src/components/atoms/input/BasicTextField";

type Props = {
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const LoginForm = (props: Props) => {
  const { running, setRunning } = props;
  const {
    email,
    setEmail,
    password,
    setPassword,
    inputError,
    errorMessage,
    loginUser,
  } = useLogin(setRunning);

  return (
    <>
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
        placeholder=""
      />
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <ExecutionButton
          onClick={loginUser}
          buttonLabel="ログイン"
          disabled={running}
        />
      </div>
    </>
  );
};

export default LoginForm;
