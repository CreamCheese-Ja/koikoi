import firebase from "src/firebase/firebase";
import { TweetCommentList } from "src/type";

// コメントリスト(次の5件)を取得する関数
export const getNextCommentList = async (
  tweetId: string,
  userId: string,
  cursor: firebase.firestore.Timestamp
): Promise<TweetCommentList | null> => {
  const ref = firebase
    .firestore()
    .collection("tweets")
    .doc(tweetId)
    .collection("comments");
  try {
    const querySnapshot = await ref
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(5)
      .get();
    // 取得したリストにuserがいいねしているかどうかのフラグを付け加えて返す
    const nextPage = await Promise.all(
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
          commentId: doc.id,
          content: doc.get("content"),
          createdAt: doc.get("createdAt"),
          updatedAt: doc.get("updatedAt"),
          numberOfLikes: doc.get("numberOfLikes"),
          userLike: userLike.exists,
        };
      })
    );
    return nextPage;
  } catch (error) {
    return null;
  }
};
