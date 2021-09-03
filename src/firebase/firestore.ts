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
  content: string
): Promise<string> => {
  try {
    firebase.firestore().collection("consultations").doc().set({
      category: category,
      title: title,
      content: content,
      supplement: "",
      solution: false,
      numberOfLikes: 0,
      numberOfAnswers: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return "投稿しました。";
  } catch (error) {
    return "error";
  }
};
