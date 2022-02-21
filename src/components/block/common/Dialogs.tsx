import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  createProfileDialogState,
  guestLoginDialogState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  passwordChangeDialogState,
  userProfileState,
  verificationEmailDialogState,
} from "src/atoms/atom";
import AlertDialog from "src/components/atoms/dialogs/AlertDialog";
import AppDialogWindow from "src/components/atoms/dialogs/AppDialogWindow";
import BasicDialog from "src/components/atoms/dialogs/BasicDialog";
import CreateProfileForm from "src/components/modules/forms/CreateProfileForm";
import GuestLoginForm from "src/components/modules/forms/GuestLoginForm";
import PasswordChangeForm from "src/components/modules/forms/PasswordChangeForm";
import { logoutApp } from "src/firebase/authentication/logoutApp";
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

  // プロフィール作成ダイアログ
  const [showCreateProfile, setShowCreateProfile] = useRecoilState(
    createProfileDialogState
  );
  // プロフィール作成処理中
  const [createProfileRunning, setCreateProfileRunning] = useState(false);
  // プロフィール作成ダイアログ開閉
  const toggleCreateProfileDialog = () => {
    setShowCreateProfile((status) => !status);
  };

  // ***********************************ゲストユーザー用*******************************

  // ゲストユーザーログインダイアログ
  const [showGuestLogin, setShowGuestLogin] = useRecoilState(
    guestLoginDialogState
  );
  // ゲストユーザーログイン実行中
  const [guestLoginRunning, setGuestLoginRunning] = useState(false);
  // ゲストログインダイアログ開閉
  const openCloseGuestLoginDialog = () => {
    setShowGuestLogin((status) => !status);
  };

  // ******************************************************************************

  // ユーザープロフィール変更関数
  const setUserProfile = useSetRecoilState(userProfileState);
  // メールアドレス検証メール送信処理
  const sendVerificationMail = async () => {
    setVerificationEmailRunning(true);
    const result = await sendVerificationEmail();
    if (result) {
      setSuccess({
        status: true,
        message:
          "確認メールを送信しました。メールを開き、有効性の確認を完了後、再度ログインしてください。",
      });
      // メール送信後1度ログアウトする。emailの有効性確認トークンのセキュリティルールが弾かれるため。
      const logoutResult = await logoutApp();
      if (logoutResult) {
        setUserProfile({
          id: "noUser",
          name: "",
          photoURL: "",
          gender: "",
          age: "",
          job: "",
          bloodType: "",
          sign: "",
          message: "",
          numberOfBestAnswer: 0,
          numberOfLikes: 0,
        });
      }
      openCloseVerificationEmailDialog();
    } else {
      setError({
        status: true,
        message:
          "メール送信エラーが発生しました。１度ログアウトし再度試してみてください。",
      });
    }
    setVerificationEmailRunning(false);
  };

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
      <BasicDialog
        title="ゲストログイン"
        open={showGuestLogin}
        onClick={openCloseGuestLoginDialog}
        content={
          <GuestLoginForm
            running={guestLoginRunning}
            setRunning={setGuestLoginRunning}
            openAndCloseDialog={openCloseGuestLoginDialog}
          />
        }
        running={guestLoginRunning}
      />
      <AppDialogWindow
        title="プロフィールの作成"
        open={showCreateProfile}
        onClick={toggleCreateProfileDialog}
        running={createProfileRunning}
        hasCancel={false}
        isLock={true}
      >
        <CreateProfileForm
          running={createProfileRunning}
          setRunning={setCreateProfileRunning}
          toggleDialog={toggleCreateProfileDialog}
        />
      </AppDialogWindow>
    </>
  );
};

export default Dialogs;
