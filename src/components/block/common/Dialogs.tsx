import React from "react";
import CreateConsultationDialog from "../../modules/dialogs/CreateConsultationDialog";
import CreateTweetDialog from "../../modules/dialogs/CreateTweetDialog";
import LoginAndSignUpFormDialog from "../../modules/dialogs/LoginAndSignUpFormDialog";
import PasswordChangeDialog from "../../modules/dialogs/PasswordChangeDialog";

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
