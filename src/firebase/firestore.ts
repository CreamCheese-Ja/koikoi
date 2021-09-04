import firebase from "./firebase";

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

// 恋愛相談のcreate関数
export const createConsultation = async (
  category: string,
  title: string,
  content: string,
  userId: string
): Promise<string> => {
  const ref = firebase.firestore().doc(`users/${userId}`);
  try {
    await firebase
      .firestore()
      .collection("consultations")
      .doc()
      .set({
        user: {
          ref: ref,
        },
        category: category,
        title: title,
        content: content,
        supplement: "",
        solution: false,
        numberOfLikes: 0,
        numberOfAnswer: 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
    return "投稿しました。";
  } catch (error) {
    return "error";
  }
};
