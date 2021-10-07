import firebase from "src/firebase/firebase";

// 回答のいいね機能
export const writeAnswerLike = async (
  consulDocId: string,
  answerDocId: string,
  likeUserId: string,
  requestUserId: string
): Promise<string> => {
  const batch = firebase.firestore().batch();

  // いいねのcreate処理
  const likeRef = firebase
    .firestore()
    .collection("consultations")
    .doc(consulDocId)
    .collection("answers")
    .doc(answerDocId)
    .collection("likes")
    .doc(requestUserId);
  batch.set(likeRef, {
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // documentのいいね数のインクリメント処理
  const documentLikesIncrementRef = firebase
    .firestore()
    .collection("consultations")
    .doc(consulDocId)
    .collection("answers")
    .doc(answerDocId);
  batch.update(documentLikesIncrementRef, {
    numberOfLikes: firebase.firestore.FieldValue.increment(1),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // userのいいね数のインクリメント処理
  const userLikesIncrementRef = firebase
    .firestore()
    .collection("users")
    .doc(likeUserId);
  batch.update(userLikesIncrementRef, {
    numberOfLikes: firebase.firestore.FieldValue.increment(1),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  try {
    await batch.commit();
    return "「いいね!」しました。";
  } catch (error) {
    return "error";
  }
};

// 補足を追加する機能
export const writeSupplement = async (
  docId: string,
  supplement: string
): Promise<string> => {
  const ref = firebase.firestore().collection("consultations").doc(docId);
  try {
    await ref.update({
      supplement: supplement,
      supplementCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return "補足を追加しました。";
  } catch (error) {
    return "error";
  }
};

// 回答に返信する機能
export const writeAnswerComment = async (
  consulId: string,
  answerId: string,
  comment: string
): Promise<string> => {
  const ref = firebase
    .firestore()
    .collection("consultations")
    .doc(consulId)
    .collection("answers")
    .doc(answerId);
  try {
    await ref.update({
      comment: comment,
      commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return "回答に返信しました。";
  } catch (error) {
    return "error";
  }
};

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
