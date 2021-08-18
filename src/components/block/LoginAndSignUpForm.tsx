import React from "react";
import LoginAndSignUpFormDialog from "../atoms/LoginAndSignUpFormDialog";

import LoginButton from "../atoms/LoginButton";
import SignUpButton from "../atoms/SignUpButton";

const LoginAndSignUpForm = () => {
  const [open, setOpen] = React.useState(false);
  const [formName, setFormName] = React.useState("");

  const handleClickOpen = (name: string) => {
    setFormName(name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <LoginButton handleClickOpen={() => handleClickOpen("ログイン")} />
      <SignUpButton handleClickOpen={() => handleClickOpen("新規登録")} />
      <LoginAndSignUpFormDialog
        open={open}
        handleClose={handleClose}
        formName={formName}
        setFormName={setFormName}
      />
    </div>
  );
};

export default LoginAndSignUpForm;
