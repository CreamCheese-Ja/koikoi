import React from "react";
import LoginAndSignUpFormDialog from "../atoms/LoginAndSignUpFormDialog";
import PasswordChangeDialog from "../atoms/PasswordChangeDialog";

const Dialogs = () => {
  return (
    <>
      <LoginAndSignUpFormDialog />
      <PasswordChangeDialog />
    </>
  );
};

export default Dialogs;
