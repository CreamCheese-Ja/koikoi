import { db } from "src/firebase/firebase";
import { UserTweetList } from "src/type";

export const getUserTweetList = async (
  userId: string
): Promise<UserTweetList | null> => {
  const userRef = db.collection("users").doc(userId);

  try {
    const querySnapshot = await db
      .collection("tweets")
      .where("user.ref", "==", userRef)
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    const firstPage = querySnapshot.docs.map((doc) => {
      return {
        tweetId: doc.id,
        category: doc.get("category"),
        content: doc.get("content"),
        numberOfLikes: doc.get("numberOfLikes"),
        numberOfComments: doc.get("numberOfComments"),
        createdAt: doc.get("createdAt"),
        updatedAt: doc.get("updatedAt"),
      };
    });
    return firstPage;
  } catch (error) {
    console.log(error);
    return null;
  }
};
