import firebase, { db } from "src/firebase/firebase";
import { TweetList } from "src/type";

// つぶやきリスト(次の10件)を取得
export const getNextTweetList = async (
  userId: string,
  cursor: firebase.firestore.Timestamp
): Promise<TweetList | null> => {
  const ref = db.collection("tweets");
  try {
    const querySnapshot = await ref
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(10)
      .get();
    // 取得したリストにuserがいいねしているかどうかのフラグを付け加えて返す
    const nextPage = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const like = await ref
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
          tweetId: doc.id,
          category: doc.get("category"),
          content: doc.get("content"),
          numberOfLikes: doc.get("numberOfLikes"),
          numberOfComments: doc.get("numberOfComments"),
          createdAt: doc.get("createdAt"),
          updatedAt: doc.get("updatedAt"),
          userLike: like.exists,
        };
      })
    );
    return nextPage;
  } catch (error) {
    return null;
  }
};
