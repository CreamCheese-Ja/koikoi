import { db } from "src/firebase/firebase";
import { TweetData } from "src/type";

export const getNewTweetData = async (
  docId: string
): Promise<TweetData | null> => {
  const ref = db.collection("tweets").doc(docId);
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
        tweetId: doc.id,
        category: doc.get("category"),
        content: doc.get("content"),
        numberOfLikes: doc.get("numberOfLikes"),
        numberOfComments: doc.get("numberOfComments"),
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
