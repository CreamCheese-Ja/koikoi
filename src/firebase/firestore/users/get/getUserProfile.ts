import firebase from "src/firebase/firebase";

// ユーザーのプロフィール情報を取得する関数
export const getUserProfile = async (
  userUid: string | undefined
): Promise<string | firebase.firestore.DocumentData> => {
  try {
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(userUid)
      .get();
    if (doc.exists) {
      const profile = doc.data();
      if (profile !== undefined) {
        return profile;
      } else {
        return "error";
      }
    } else {
      return "ユーザー情報を取得出来ませんでした。";
    }
  } catch (error) {
    return "ユーザー情報を取得出来ませんでした。";
  }
};
