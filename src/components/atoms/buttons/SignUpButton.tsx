import React from "react";
import Button from "@material-ui/core/Button";
import { useSetRecoilState } from "recoil";
import { loginAndSignUpFormState } from "src/atoms/atom";

const SignUpButton = () => {
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => {
          setLoginAndSignUpForm({ title: "無料会員登録", status: true });
        }}
      >
        無料会員登録
      </Button>
    </>
  );
};

export default SignUpButton;
