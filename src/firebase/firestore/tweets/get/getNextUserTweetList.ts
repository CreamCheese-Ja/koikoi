import firebase, { db } from "src/firebase/firebase";
import { UserTweetList } from "src/type";

export const getNextUserTweetList = async (
  userId: string,
  cursor: firebase.firestore.Timestamp
): Promise<UserTweetList | null> => {
  const userRef = db.collection("users").doc(userId);

  try {
    const querySnapshot = await db
      .collection("tweets")
      .where("user.ref", "==", userRef)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
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
