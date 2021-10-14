import firebase, { db, timeStamp } from "src/firebase/firebase";

// 恋愛相談、つぶやきのいいね機能
export const writeConsulAndTweetLike = async (
  collectionId: string,
  documentId: string,
  likeUserId: string,
  requestUserId: string
): Promise<boolean> => {
  const batch = db.batch();

  // いいねのcreate処理
  const likeRef = firebase
    .firestore()
    .collection(collectionId)
    .doc(documentId)
    .collection("likes")
    .doc(requestUserId);
  batch.set(likeRef, {
    createdAt: timeStamp,
  });

  // documentのいいね数のインクリメント処理
  const documentLikesIncrementRef = firebase
    .firestore()
    .collection(collectionId)
    .doc(documentId);
  batch.update(documentLikesIncrementRef, {
    numberOfLikes: firebase.firestore.FieldValue.increment(1),
    updatedAt: timeStamp,
  });

  // userのいいね数のインクリメント処理
  const userLikesIncrementRef = firebase
    .firestore()
    .collection("users")
    .doc(likeUserId);
  batch.update(userLikesIncrementRef, {
    numberOfLikes: firebase.firestore.FieldValue.increment(1),
    updatedAt: timeStamp,
  });

  try {
    await batch.commit();
    return true;
  } catch (error) {
    return false;
  }
};
