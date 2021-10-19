import firebase from "src/firebase/firebase";

// メール確認が終わっているかどうか確認する関数
export const getIsEmailVerified = (): boolean => {
  const user = firebase.auth().currentUser;
  if (user) {
    const emailVerified = user.emailVerified;
    return emailVerified;
  } else {
    return false;
  }
};
