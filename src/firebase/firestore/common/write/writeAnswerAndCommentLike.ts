import firebase, { db, timeStamp } from "src/firebase/firebase";

// 回答とTweetコメントのいいね機能
export const writeAnswerAndCommentLike = async (
  firstCollectionId: string,
  secondCollectionId: string,
  firstCollectionDocId: string,
  secondCollectionDocId: string,
  likeUserId: string,
  requestUserId: string
): Promise<boolean> => {
  const batch = db.batch();

  // いいねのcreate処理
  const likeRef = db
    .collection(firstCollectionId)
    .doc(firstCollectionDocId)
    .collection(secondCollectionId)
    .doc(secondCollectionDocId)
    .collection("likes")
    .doc(requestUserId);
  batch.set(likeRef, {
    createdAt: timeStamp,
  });

  // documentのいいね数のインクリメント処理
  const documentLikesIncrementRef = db
    .collection(firstCollectionId)
    .doc(firstCollectionDocId)
    .collection(secondCollectionId)
    .doc(secondCollectionDocId);
  batch.update(documentLikesIncrementRef, {
    numberOfLikes: firebase.firestore.FieldValue.increment(1),
    updatedAt: timeStamp,
  });

  // userのいいね数のインクリメント処理
  const userLikesIncrementRef = db.collection("users").doc(likeUserId);
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
