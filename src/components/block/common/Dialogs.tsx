import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  passwordChangeDialogState,
  verificationEmailDialogState,
} from "src/atoms/atom";
import AlertDialog from "src/components/atoms/dialogs/AlertDialog";
import BasicDialog from "src/components/atoms/dialogs/BasicDialog";
import PasswordChangeForm from "src/components/modules/forms/PasswordChangeForm";
import { sendVerificationEmail } from "src/firebase/authentication/sendVerificationEmail";
import LoginAndSignUpFormDialog from "../../modules/dialogs/LoginAndSignUpFormDialog";

const Dialogs = () => {
  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // パスワード変更ダイアログ
  const [showPasswordChange, setShowPasswordChange] = useRecoilState(
    passwordChangeDialogState
  );
  // パスワード変更処理中
  const [passwordChangeRunning, setPasswordChangeRunning] = useState(false);
  // パスワード変更ダイアログ開閉
  const openClosePasswordChangeDialog = () => {
    setShowPasswordChange((status) => !status);
  };

  // メールアドレス検証ダイアログ
  const [showVerificationEmail, setShowVerificationEmail] = useRecoilState(
    verificationEmailDialogState
  );
  // メールアドレス検証メール送信処理中
  const [verificationEmailRunning, setVerificationEmailRunning] =
    useState(false);
  // メールアドレス検証ダイアログ開閉
  const openCloseVerificationEmailDialog = () => {
    setShowVerificationEmail((status) => !status);
  };
  // メールアドレス検証メール送信処理
  const sendVerificationMail = async () => {
    setVerificationEmailRunning(true);
    const result = await sendVerificationEmail();
    if (result) {
      setSuccess({
        status: true,
        message:
          "確認メールを送信しました。メールを開き、有効性の確認を完了してください。",
      });
      openCloseVerificationEmailDialog();
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
    }
    setVerificationEmailRunning(false);
  };

  // メールアドレス変更ダイアログ
  // const [showEmailChange, setShowEmailChange] = useRecoilState(
  //   emailChangeDialogState
  // );
  // メールアドレス変更処理中
  // const [emailChangeRunning, setEmailChangeRunning] = useState(false);
  // メールアドレス変更ダイアログ開閉
  // const openCloseEmailChangeDialog = () => {
  //   setShowEmailChange((status) => !status);
  // };

  return (
    <>
      <LoginAndSignUpFormDialog />
      <BasicDialog
        title="パスワードの変更"
        open={showPasswordChange}
        onClick={openClosePasswordChangeDialog}
        content={
          <PasswordChangeForm
            running={passwordChangeRunning}
            setRunning={setPasswordChangeRunning}
            openAndCloseDialog={openClosePasswordChangeDialog}
          />
        }
        running={passwordChangeRunning}
      />
      <AlertDialog
        open={showVerificationEmail}
        dialogClose={openCloseVerificationEmailDialog}
        title="メールアドレスの確認"
        content="登録されているメールアドレス宛に有効性確認用メールを送信します。よろしいですか？"
        mainMethod={sendVerificationMail}
        running={verificationEmailRunning}
      />
      {/* <BasicDialog
        title="メールアドレスの変更"
        open={showEmailChange}
        onClick={openCloseEmailChangeDialog}
        content={
          <EmailChangeForm
            running={emailChangeRunning}
            setRunning={setEmailChangeRunning}
            openAndCloseDialog={openCloseEmailChangeDialog}
          />
        }
        running={emailChangeRunning}
      /> */}
    </>
  );
};

export default Dialogs;
