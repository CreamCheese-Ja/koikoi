import firebase from "src/firebase/firebase";

// ベストアンサーを決定する機能
export const writeBestAnswer = async (
  consulId: string,
  answerId: string,
  answerUserId: string
) => {
  const batch = firebase.firestore().batch();

  // 回答をベストアンサーにする
  const answerRef = firebase
    .firestore()
    .collection("consultations")
    .doc(consulId)
    .collection("answers")
    .doc(answerId);
  batch.update(answerRef, {
    bestAnswer: true,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // 相談を解決済みにする
  const consulRef = firebase
    .firestore()
    .collection("consultations")
    .doc(consulId);
  batch.update(consulRef, {
    solution: true,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // ユーザーのベストアンサー数を更新
  const userRef = firebase.firestore().collection("users").doc(answerUserId);
  batch.update(userRef, {
    numberOfBestAnswer: firebase.firestore.FieldValue.increment(1),
  });
  try {
    await batch.commit();
    return "ベストアンサーを決定しました。";
  } catch (error) {
    return "error";
  }
};
