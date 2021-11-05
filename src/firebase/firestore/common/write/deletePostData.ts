import { db } from "src/firebase/firebase";

// 投稿を削除する(単一ドキュメント)
export const deletePostData = async (collectionId: string, docId: string) => {
  try {
    await db.collection(collectionId).doc(docId).delete();
    return true;
  } catch (error) {
    return false;
  }
};
