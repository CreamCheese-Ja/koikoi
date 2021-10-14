import firebase, { db, timeStamp } from "src/firebase/firebase";

// 恋愛相談のcreate関数(後でデータを取得するためdocumentIdを返す)
export const createConsultation = async (
  category: string,
  title: string,
  content: string,
  userId: string
): Promise<string | null> => {
  const userRef = db.doc(`users/${userId}`);
  try {
    const ref = db.collection("consultations").doc();
    await ref.set({
      user: {
        ref: userRef,
      },
      category: category,
      title: title,
      content: content,
      supplement: "",
      solution: false,
      numberOfLikes: 0,
      numberOfAnswer: 0,
      createdAt: timeStamp,
      updatedAt: timeStamp,
      supplementCreatedAt: timeStamp,
    });
    const consulId = ref.id;
    return consulId;
  } catch (error) {
    return null;
  }
};
