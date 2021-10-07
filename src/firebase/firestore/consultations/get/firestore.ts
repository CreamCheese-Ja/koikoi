import firebase from "src/firebase/firebase";
import { AnswerData } from "src/type";

// ユーザーが投稿した新規の回答を１件取得する
export const getNewAnswerData = async (
  userId: string,
  consultationId: string
): Promise<AnswerData | string> => {
  const ref = firebase
    .firestore()
    .collection("consultations")
    .doc(consultationId)
    .collection("answers")
    .doc(userId);
  try {
    const doc = await ref.get();
    if (doc) {
      const userData = await doc.get("user.ref").get();
      return {
        user: {
          id: userData.id,
          name: userData.get("name"),
          photoURL: userData.get("photoURL"),
        },
        answerId: doc.id,
        content: doc.get("content"),
        numberOfLikes: doc.get("numberOfLikes"),
        bestAnswer: doc.get("bestAnswer"),
        comment: doc.get("comment"),
        commentCreatedAt: doc.get("commentCreatedAt"),
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

// ベストアンサーの取得
export const getBestAnswerData = async (
  consulId: string
): Promise<AnswerData | null> => {
  const ref = firebase
    .firestore()
    .collection("consultations")
    .doc(consulId)
    .collection("answers")
    .where("bestAnswer", "==", true)
    .limit(1);
  try {
    const bestAnswerSnapshot = await ref.get();
    const bestAnswerData = bestAnswerSnapshot.docs.find(
      (doc) => doc.data().bestAnswer === true
    );
    if (bestAnswerData) {
      const userData = await bestAnswerData.get("user.ref").get();
      return {
        user: {
          id: userData.id,
          name: userData.get("name"),
          photoURL: userData.get("photoURL"),
        },
        answerId: bestAnswerData.id,
        content: bestAnswerData.get("content"),
        numberOfLikes: bestAnswerData.get("numberOfLikes"),
        bestAnswer: bestAnswerData.get("bestAnswer"),
        comment: bestAnswerData.get("comment"),
        commentCreatedAt: bestAnswerData.get("commentCreatedAt"),
        createdAt: bestAnswerData.get("createdAt"),
        updatedAt: bestAnswerData.get("updatedAt"),
        userLike: false,
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
