import firebase from "./firebase";

// email、passwordでログイン処理をする関数
export const loginEmailAndPassword = async (
  email: string,
  password: string
): Promise<string | firebase.User> => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    if (user !== null) {
      return user;
    } else {
      return "error";
    }
  } catch (e) {
    const error = e as firebase.FirebaseError;
    const errorCode = error.code;

    switch (errorCode) {
      case "auth/invalid-email":
        return "正しい形式で入力してください。";
      case "auth/user-disabled":
        return "サービスの利用が停止されています。";
      case "auth/user-not-found":
        return "メールアドレスまたはパスワードが違います。";
      case "auth/wrong-password":
        return "メールアドレスまたはパスワードが違います。";
      default:
        return "error";
    }
  }
};

// パスワードを再設定するための関数
export const sendPasswordResetEmail = async (
  email: string
): Promise<string> => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return "completion";
  } catch (e) {
    const error = e as firebase.FirebaseError;
    const errorCode = error.code;
    switch (errorCode) {
      case "auth/invalid-email":
        return "正しい形式で入力してください。";
      case "auth/user-not-found":
        return "アカウントが存在しません。";
      default:
        return "error";
    }
  }
};

// メール確認が終わっているかどうか確認する関数
export const checkEmailVerified = (): boolean => {
  const user = firebase.auth().currentUser;
  if (user !== null) {
    const emailVerified = user.emailVerified;
    return emailVerified;
  } else {
    return false;
  }
};
