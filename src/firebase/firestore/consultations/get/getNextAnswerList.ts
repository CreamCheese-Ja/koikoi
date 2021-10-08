import firebase from "src/firebase/firebase";
import { AnswerList } from "src/type";

// 回答のリスト(次の5件)を取得し加工した値を返す関数
export const getNextAnswerList = async (
  consulId: string,
  userId: string,
  cursor: firebase.firestore.Timestamp
): Promise<AnswerList | null> => {
  const ref = firebase
    .firestore()
    .collection("consultations")
    .doc(consulId)
    .collection("answers");
  try {
    const querySnapshot = await ref
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(5)
      .get();
    // 取得したリストにuserがいいねしているかどうかのフラグを付け加えて返す
    const currentPage = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const userLike = await ref
          .doc(doc.id)
          .collection("likes")
          .doc(userId)
          .get();
        const userData = await doc.get("user.ref").get();
        return {
          user: {
            id: userData.id,
            name: userData.get("name"),
            photoURL: userData.get("photoURL"),
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
    return currentPage;
  } catch (error) {
    return null;
  }
};
