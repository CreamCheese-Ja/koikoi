import firebase from "src/firebase/firebase";

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
  } catch (error) {
    const e = error as firebase.FirebaseError;
    const errorCode = e.code;

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
