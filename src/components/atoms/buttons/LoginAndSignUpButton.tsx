import Button from "@material-ui/core/Button";
import { useSetRecoilState } from "recoil";
import { loginAndSignUpFormState } from "src/atoms/atom";

const LoginAndSignUpButton = () => {
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  return (
    <div>
      <Button
        color="secondary"
        onClick={() => {
          setLoginAndSignUpForm({ title: "ログイン", status: true });
        }}
      >
        ログイン
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          setLoginAndSignUpForm({ title: "無料会員登録", status: true });
        }}
      >
        無料会員登録
      </Button>
    </div>
  );
};

export default LoginAndSignUpButton;
