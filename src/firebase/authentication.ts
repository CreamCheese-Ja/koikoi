import firebase from "./firebase";

// email、passwordでログイン処理をする関数
export const loginEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const user = userCredential.user;
    return user;
  } catch (error) {
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
    }
  }
};

// パスワードを再設定するための関数
export const sendPasswordResetEmail = async (email: string) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return "completion";
  } catch (error) {
    const errorCode = error.code;
    switch (errorCode) {
      case "auth/invalid-email":
        return "正しい形式で入力してください。";
      case "auth/wrong-password":
        return "メールアドレスまたはパスワードが違います。";
    }
  }
};
