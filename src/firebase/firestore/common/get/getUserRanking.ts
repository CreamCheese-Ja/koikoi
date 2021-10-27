import { db } from "src/firebase/firebase";
import { UserBestAnswerRanking, UserLikeRanking } from "src/type";

export const getUserRanking = async (
  fieldName: string
): Promise<UserLikeRanking | UserBestAnswerRanking | null> => {
  const ref = db.collection("users").orderBy(fieldName, "desc").limit(5);
  try {
    const querySnapshot = await ref.get();
    if (fieldName === "numberOfLikes") {
      const rankingData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.get("name"),
          photoURL: doc.get("photoURL"),
          numberOfLikes: doc.get("numberOfLikes"),
        };
      });
      return rankingData;
    } else {
      const rankingData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.get("name"),
          photoURL: doc.get("photoURL"),
          numberOfBestAnswer: doc.get("numberOfBestAnswer"),
        };
      });
      return rankingData;
    }
  } catch (error) {
    return null;
  }
};
