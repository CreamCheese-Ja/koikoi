import firebase from "src/firebase/firebase";

// 恋愛相談、つぶやきのいいね機能
export const writeConsulAndTweetLike = async (
  collectionId: string,
  documentId: string,
  likeUserId: string,
  requestUserId: string
): Promise<string> => {
  const batch = firebase.firestore().batch();

  // いいねのcreate処理
  const likeRef = firebase
    .firestore()
    .collection(collectionId)
    .doc(documentId)
    .collection("likes")
    .doc(requestUserId);
  batch.set(likeRef, {
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // documentのいいね数のインクリメント処理
  const documentLikesIncrementRef = firebase
    .firestore()
    .collection(collectionId)
    .doc(documentId);
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