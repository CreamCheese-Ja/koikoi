import Button from "@material-ui/core/Button";
import { useSetRecoilState } from "recoil";
import { loginAndSignUpFormState } from "src/atoms/atom";

const LoginButton = () => {
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);
  return (
    <>
      <Button
        color="secondary"
        onClick={() => {
          setLoginAndSignUpForm({ title: "ログイン", status: true });
        }}
      >
        ログイン
      </Button>
    </>
  );
};

export default LoginButton;
