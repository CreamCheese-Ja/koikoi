import firebase from "src/firebase/firebase";

// パスワードを再設定するための関数
export const sendPasswordResetEmail = async (
  email: string
): Promise<boolean | string> => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return true;
  } catch (error) {
    const e = error as firebase.FirebaseError;
    const errorCode = e.code;
    switch (errorCode) {
      case "auth/invalid-email":
        return "正しい形式で入力してください。";
      case "auth/user-not-found":
        return "アカウントが存在しません。";
      default:
        return false;
    }
  }
};
