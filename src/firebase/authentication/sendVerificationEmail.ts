import firebase from "src/firebase/firebase";

// メールアドレスの有効性を確認するメールの送信
export const sendVerificationEmail = async (): Promise<boolean> => {
  try {
    await firebase.auth().currentUser?.sendEmailVerification();
    return true;
  } catch (error) {
    return false;
  }
};
