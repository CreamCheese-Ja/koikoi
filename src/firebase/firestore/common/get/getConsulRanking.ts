import { db } from "src/firebase/firebase";
import { ConsulAnswerRanking, ConsulLikeRanking } from "src/type";

export const getConsulRanking = async (
  fieldName: string
): Promise<ConsulLikeRanking | ConsulAnswerRanking | null> => {
  const ref = db
    .collection("consultations")
    .orderBy(fieldName, "desc")
    .limit(5);
  try {
    const querySnapshot = await ref.get();
    if (fieldName === "numberOfLikes") {
      const rankingData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.get("title"),
          numberOfLikes: doc.get("numberOfLikes"),
        };
      });
      return rankingData;
    } else {
      const rankingData = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          title: doc.get("title"),
          numberOfAnswer: doc.get("numberOfAnswer"),
        };
      });
      return rankingData;
    }
  } catch (error) {
    return null;
  }
};
