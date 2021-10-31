import firebase from "src/firebase/firebase";
import { getEmailAuthCredential } from "./getEmailAuthCredential";

// メールアドレスの変更処理
export const updateEmail = async (
  newEmail: string,
  password: string
): Promise<boolean | string> => {
  const user = firebase.auth().currentUser;
  // 再認証をする必要がある
  if (user?.email) {
    const credential = getEmailAuthCredential(user.email, password);
    try {
      if (user) {
        await user.reauthenticateWithCredential(credential);
        await user.updateEmail(newEmail);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      const e = error as firebase.FirebaseError;
      const errorCode = e.code;
      switch (errorCode) {
        case "auth/email-already-in-use":
          return "このメールアドレスは既に使用されています。";
        case "auth/invalid-email":
          return "正しい形式で入力してください。";
        case "auth/requires-recent-login":
          return "reLogin";
        default:
          return false;
      }
    }
  } else {
    return false;
  }
};
