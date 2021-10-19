import firebase from "src/firebase/firebase";

// 恋愛相談、つぶやきにユーザーがいいねしているかどうかのみをチェックする(個別ページCSR用)
export const getIsUserLike = async (
  userId: string,
  collectionId: string,
  docId: string
): Promise<boolean> => {
  const ref = firebase
    .firestore()
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
