import { db } from "src/firebase/firebase";

// 恋愛相談、つぶやきにユーザーがいいねしているかどうかのみをチェックする(個別ページCSR用)
export const getIsUserLike = async (
  userId: string,
  collectionId: string,
  docId: string
): Promise<boolean> => {
  const ref = db
    .collection(collectionId)
    .doc(docId)
    .collection("likes")
    .doc(userId);
  try {
    const userLike = await ref.get();
    return userLike.exists;
  } catch (error) {
    return false;
  }
};
