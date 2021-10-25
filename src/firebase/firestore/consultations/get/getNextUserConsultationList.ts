import firebase, { db } from "src/firebase/firebase";
import { UserConsulList } from "src/type";

export const getNextUserConsultationList = async (
  userId: string,
  cursor: firebase.firestore.Timestamp
): Promise<UserConsulList | null> => {
  const userRef = db.collection("users").doc(userId);

  try {
    const querySnapshot = await db
      .collection("consultations")
      .where("user.ref", "==", userRef)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(10)
      .get();
    const nextPage = querySnapshot.docs.map((doc) => {
      return {
        consultationId: doc.id,
        category: doc.get("category"),
        title: doc.get("title"),
        content: doc.get("content"),
        supplement: doc.get("supplement"),
        solution: doc.get("solution"),
        numberOfLikes: doc.get("numberOfLikes"),
        numberOfAnswer: doc.get("numberOfAnswer"),
        createdAt: doc.get("createdAt"),
        updatedAt: doc.get("updatedAt"),
      };
    });
    return nextPage;
  } catch (error) {
    return null;
  }
};
