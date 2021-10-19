import firebase from "src/firebase/firebase";

export const signUpEmailAndPassword = async (
  email: string,
  password: string
): Promise<boolean | string> => {
  try {
    // 新規登録
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    const e = error as firebase.FirebaseError;
    const errorCode = e.code;
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "このメールアドレスは既に使用されています。";
      case "auth/invalid-email":
        return "正しい形式で入力してください。";
      case "auth/weak-password":
        return "パスワードは6文字以上です。";
      default:
        return false;
    }
  }
};
