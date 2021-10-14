import { db } from "src/firebase/firebase";
import { AnswerData } from "src/type";

// ユーザーが投稿した新規の回答を１件取得する
export const getNewAnswerData = async (
  userId: string,
  consultationId: string
): Promise<AnswerData | null> => {
  const ref = db
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
      return null;
    }
  } catch (error) {
    return null;
  }
};
