import { db } from "src/firebase/firebase";
import { TweetCommentRanking, TweetLikeRanking } from "src/type";

export const getTweetRanking = async (
  fieldName: string
): Promise<TweetLikeRanking | TweetCommentRanking | null> => {
  const ref = db.collection("tweets").orderBy(fieldName, "desc").limit(5);
  try {
    const querySnapshot = await ref.get();
    if (fieldName === "numberOfLikes") {
      const rankingData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          content: doc.get("content"),
          numberOfLikes: doc.get("numberOfLikes"),
        };
      });
      return rankingData;
    } else {
      const rankingData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          content: doc.get("content"),
          numberOfComments: doc.get("numberOfComments"),
        };
      });
      return rankingData;
    }
  } catch (error) {
    return null;
  }
};
