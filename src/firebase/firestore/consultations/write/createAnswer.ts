import firebase, { db, timeStamp } from "src/firebase/firebase";

// 恋愛相談の回答create機能
export const createAnswer = async (
  consultationId: string,
  userId: string,
  content: string
): Promise<boolean> => {
  const batch = db.batch();
  const userRef = db.doc(`users/${userId}`);
  // 回答のcreate処理
  const answerRef = db
    .collection("consultations")
    .doc(consultationId)
    .collection("answers")
    .doc(userId);
  batch.set(answerRef, {
    user: {
      ref: userRef,
    },
    content: content,
    createdAt: timeStamp,
    updatedAt: timeStamp,
    numberOfLikes: 0,
    bestAnswer: false,
    comment: "",
    commentCreatedAt: timeStamp,
  });

  // 回答数のインクリメント処理
  const consultationRef = db.collection("consultations").doc(consultationId);
  batch.update(consultationRef, {
    numberOfAnswer: firebase.firestore.FieldValue.increment(1),
    updatedAt: timeStamp,
  });

  try {
    await batch.commit();
    return true;
  } catch (error) {
    return false;
  }
};
