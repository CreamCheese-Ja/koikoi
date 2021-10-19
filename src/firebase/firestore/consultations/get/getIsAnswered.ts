import { db } from "src/firebase/firebase";

// ユーザーがすでに回答を投稿しているかどうかチェックする
export const getIsAnswered = async (
  userId: string,
  consulDocId: string
): Promise<boolean> => {
  const ref = db
    .collection("consultations")
    .doc(consulDocId)
    .collection("answers")
    .doc(userId);
  const doc = await ref.get();
  if (doc.exists) {
    return true;
  } else {
    return false;
  }
};
