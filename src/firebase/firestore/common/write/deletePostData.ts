import firebase, { db, timeStamp } from "src/firebase/firebase";

// 投稿を削除する
export const deletePostData = async (
  collectionId: string,
  docId: string,
  subCollectionId?: string,
  subCollectionDocId?: string
): Promise<boolean> => {
  if (!subCollectionId) {
    // 恋愛相談、つぶやきの場合
    try {
      await db.collection(collectionId).doc(docId).delete();
      return true;
    } catch (error) {
      return false;
    }
  } else {
    // 回答の場合
    const batch = db.batch();
    // 回答、コメントの削除処理
    batch.delete(
      db
        .collection(collectionId)
        .doc(docId)
        .collection(subCollectionId)
        .doc(subCollectionDocId)
    );
    // 回答数のデクリメント処理
    batch.update(db.collection(collectionId).doc(docId), {
      numberOfAnswer: firebase.firestore.FieldValue.increment(-1),
      updatedAt: timeStamp,
    });
    try {
      await batch.commit();
      return true;
    } catch (error) {
      return false;
    }
  }
};
