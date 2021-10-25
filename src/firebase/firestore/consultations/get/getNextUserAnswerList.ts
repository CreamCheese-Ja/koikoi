import firebase, { db } from "src/firebase/firebase";
import { UserAnswerList } from "src/type";

export const getNextUserAnswerList = async (
  userId: string,
  cursor: firebase.firestore.Timestamp
): Promise<UserAnswerList | null> => {
  const userRef = db.collection("users").doc(userId);

  try {
    const querySnapshot = await db
      .collectionGroup("answers")
      .where("user.ref", "==", userRef)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(10)
      .get();
    const firstPage = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        // 親のconsultationドキュメントを取得しに行く
        const consulData = await doc.ref.parent.parent?.get();
        if (consulData) {
          return {
            consultationId: consulData.id,
            consultationTitle: consulData.get("title"),
            answerId: doc.id,
            content: doc.get("content"),
            createdAt: doc.get("createdAt"),
            numberOfLikes: doc.get("numberOfLikes"),
          };
        } else {
          // consultationドキュメントがない(削除トラブルがあった)場合、"none"を入れる
          return {
            consultationId: "none",
            consultationTitle: "none",
            answerId: doc.id,
            content: doc.get("content"),
            createdAt: doc.get("createdAt"),
            numberOfLikes: doc.get("numberOfLikes"),
          };
        }
      })
    );
    return firstPage;
  } catch (error) {
    return null;
  }
};
