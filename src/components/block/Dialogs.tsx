import React from "react";
import CreateConsultationDialog from "../modules/dialogs/CreateConsultationDialog";
import CreateTweetDialog from "../modules/dialogs/CreateTweetDialog";
import LoginAndSignUpFormDialog from "../atoms/LoginAndSignUpFormDialog";
import PasswordChangeDialog from "../atoms/PasswordChangeDialog";

const Dialogs = () => {
  return (
    <>
      <LoginAndSignUpFormDialog />
      <PasswordChangeDialog />
      <CreateConsultationDialog />
      <CreateTweetDialog />
    </>
  );
};

export default Dialogs;
