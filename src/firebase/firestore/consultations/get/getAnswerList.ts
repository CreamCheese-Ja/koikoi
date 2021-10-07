import firebase from "src/firebase/firebase";
import { AnswerList } from "src/type";

// 恋愛相談詳細に対する回答リストを取得(恋愛相談詳細ページCSR用)
export const getAnswerList = async (
  docId: string,
  userId: string
): Promise<AnswerList | string> => {
  // 回答へのリファレンス
  const answersRef = firebase
    .firestore()
    .collection("consultations")
    .doc(docId)
    .collection("answers");
  try {
    // 取得した恋愛相談ドキュメントに中の回答を5つ取得
    const answersSnapshot = await answersRef
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    // 回答のuserRefを値に直し、いいね済みかどうかを確認後リスト化
    const answersList = await Promise.all(
      answersSnapshot.docs.map(async (doc) => {
        // 回答にいいね済みかどうかを確認
        const userLike = await answersRef
          .doc(doc.id)
          .collection("likes")
          .doc(userId)
          .get();
        const answerUserData = await doc.get("user.ref").get();
        return {
          user: {
            id: answerUserData.id,
            name: answerUserData.get("name"),
            photoURL: answerUserData.get("photoURL"),
          },
          answerId: doc.id,
          content: doc.get("content"),
          createdAt: doc.get("createdAt"),
          updatedAt: doc.get("updatedAt"),
          numberOfLikes: doc.get("numberOfLikes"),
          bestAnswer: doc.get("bestAnswer"),
          comment: doc.get("comment"),
          commentCreatedAt: doc.get("commentCreatedAt"),
          userLike: userLike.exists,
        };
      })
    );
    return answersList;
  } catch (error) {
    return "error";
  }
};
