import { db } from "src/firebase/firebase";
import { TweetList } from "src/type";

export const getTweetsList = async (
  userId: string
): Promise<TweetList | null> => {
  const ref = db.collection("tweets");
  try {
    const querySnapshot = await ref
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    // 取得したリストにuserがいいねしているかどうかのフラグを付け加えて返す
    const firstPage = await Promise.all(
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
          tweetId: doc.id,
          category: doc.get("category"),
          content: doc.get("content"),
          numberOfLikes: doc.get("numberOfLikes"),
          numberOfComments: doc.get("numberOfComments"),
          createdAt: doc.get("createdAt"),
          updatedAt: doc.get("updatedAt"),
          userLike: userLike.exists,
        };
      })
    );
    return firstPage;
  } catch (error) {
    return null;
  }
};
