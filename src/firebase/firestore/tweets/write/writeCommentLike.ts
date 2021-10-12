import firebase, { db, timeStamp } from "src/firebase/firebase";

// 回答のいいね機能
export const writeCommentLike = async (
  tweetDocId: string,
  commentDocId: string,
  likeUserId: string,
  requestUserId: string
): Promise<boolean> => {
  const batch = db.batch();

  // いいねのcreate処理
  const likeRef = db
    .collection("tweets")
    .doc(tweetDocId)
    .collection("comments")
    .doc(commentDocId)
    .collection("likes")
    .doc(requestUserId);
  batch.set(likeRef, {
    createdAt: timeStamp,
  });

  // documentのいいね数のインクリメント処理
  const documentLikesIncrementRef = firebase
    .firestore()
    .collection("tweets")
    .doc(tweetDocId)
    .collection("comments")
    .doc(commentDocId);
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
