import firebase from "src/firebase/firebase";

// 恋愛相談の回答create機能
export const createAnswer = async (
  consultationId: string,
  userId: string,
  content: string
): Promise<string> => {
  const batch = firebase.firestore().batch();
  const userRef = firebase.firestore().doc(`users/${userId}`);
  // 回答のcreate処理
  const answerRef = firebase
    .firestore()
    .collection("consultations")
    .doc(consultationId)
    .collection("answers")
    .doc(userId);
  batch.set(answerRef, {
    user: {
      ref: userRef,
    },
    content: content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    numberOfLikes: 0,
    bestAnswer: false,
    comment: "",
    commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // 回答数のインクリメント処理
  const consultationRef = firebase
    .firestore()
    .collection("consultations")
    .doc(consultationId);
  batch.update(consultationRef, {
    numberOfAnswer: firebase.firestore.FieldValue.increment(1),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  try {
    await batch.commit();
    return "投稿しました";
  } catch (error) {
    return "error";
  }
};
