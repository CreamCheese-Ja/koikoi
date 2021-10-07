import firebase from "src/firebase/firebase";
import { ConsultationData } from "src/type";

// ユーザーが投稿した最新の恋愛相談を1件取得
export const getNewConsultationData = async (
  docId: string
): Promise<ConsultationData | string> => {
  const ref = firebase.firestore().collection("consultations").doc(docId);
  try {
    const doc = await ref.get();
    if (doc !== undefined) {
      const userData = await doc.get("user.ref").get();
      return {
        user: {
          id: userData.id,
          name: userData.get("name"),
          photoURL: userData.get("photoURL"),
        },
        consultationId: doc.id,
        category: doc.get("category"),
        title: doc.get("title"),
        content: doc.get("content"),
        supplement: doc.get("supplement"),
        solution: doc.get("solution"),
        numberOfLikes: doc.get("numberOfLikes"),
        numberOfAnswer: doc.get("numberOfAnswer"),
        createdAt: doc.get("createdAt"),
        updatedAt: doc.get("updatedAt"),
        userLike: false,
      };
    } else {
      return "error";
    }
  } catch (error) {
    return "error";
  }
};
