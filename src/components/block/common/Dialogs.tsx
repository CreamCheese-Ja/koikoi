import React from "react";
import LoginAndSignUpFormDialog from "../../modules/dialogs/LoginAndSignUpFormDialog";
import PasswordChangeDialog from "../../modules/dialogs/PasswordChangeDialog";

const Dialogs = () => {
  return (
    <>
      <LoginAndSignUpFormDialog />
      <PasswordChangeDialog />
    </>
  );
};

export default Dialogs;
