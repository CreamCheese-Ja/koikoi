import firebase, { db } from "src/firebase/firebase";

// ユーザーのプロフィール情報を取得する関数
export const getUserProfile = async (
  userUid: string | undefined
): Promise<firebase.firestore.DocumentData | null> => {
  try {
    const doc = await db.collection("users").doc(userUid).get();
    if (doc.exists) {
      const profile = doc.data();
      if (profile) {
        return profile;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
