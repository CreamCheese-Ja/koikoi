import firebase from "src/firebase/firebase";
import { AnswerData } from "src/type";

// ベストアンサーの取得
export const getBestAnswerData = async (
  consulId: string,
  userId: string
): Promise<AnswerData | null> => {
  const ref = firebase
    .firestore()
    .collection("consultations")
    .doc(consulId)
    .collection("answers");
  try {
    const bestAnswerSnapshot = await ref
      .where("bestAnswer", "==", true)
      .limit(1)
      .get();
    const bestAnswerData = bestAnswerSnapshot.docs.find(
      (doc) => doc.data().bestAnswer === true
    );
    // いいね済みかどうか確認
    const userLike = await ref
      .doc(bestAnswerData?.id)
      .collection("likes")
      .doc(userId)
      .get();

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
        userLike: userLike.exists,
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
