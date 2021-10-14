import firebase, { db, timeStamp } from "src/firebase/firebase";

// ベストアンサーを決定する機能
export const writeBestAnswer = async (
  consulId: string,
  answerId: string,
  answerUserId: string
): Promise<boolean> => {
  const batch = db.batch();

  // 回答をベストアンサーにする
  const answerRef = firebase
    .firestore()
    .collection("consultations")
    .doc(consulId)
    .collection("answers")
    .doc(answerId);
  batch.update(answerRef, {
    bestAnswer: true,
    updatedAt: timeStamp,
  });

  // 相談を解決済みにする
  const consulRef = firebase
    .firestore()
    .collection("consultations")
    .doc(consulId);
  batch.update(consulRef, {
    solution: true,
    updatedAt: timeStamp,
  });

  // ユーザーのベストアンサー数を更新
  const userRef = db.collection("users").doc(answerUserId);
  batch.update(userRef, {
    numberOfBestAnswer: firebase.firestore.FieldValue.increment(1),
  });
  try {
    await batch.commit();
    return true;
  } catch (error) {
    return false;
  }
};
