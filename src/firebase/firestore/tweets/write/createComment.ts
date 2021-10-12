import firebase, { db, timeStamp } from "src/firebase/firebase";

// つぶやきのコメントcreate機能
export const createComment = async (
  tweetId: string,
  userId: string,
  content: string
): Promise<string | boolean> => {
  const batch = db.batch();
  const userRef = db.doc(`users/${userId}`);
  // コメントのcreate処理
  const commentRef = db
    .collection("tweets")
    .doc(tweetId)
    .collection("comments")
    .doc();
  batch.set(commentRef, {
    user: {
      ref: userRef,
    },
    content: content,
    createdAt: timeStamp,
    updatedAt: timeStamp,
    numberOfLikes: 0,
  });
  // コメント数のインクリメント処理
  const tweetRef = db.collection("tweets").doc(tweetId);
  batch.update(tweetRef, {
    numberOfComments: firebase.firestore.FieldValue.increment(1),
    updatedAt: timeStamp,
  });
  try {
    await batch.commit();
    const commentID = commentRef.id;
    return commentID;
  } catch (error) {
    return false;
  }
};
