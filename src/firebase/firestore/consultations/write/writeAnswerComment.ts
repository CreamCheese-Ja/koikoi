import { db, timeStamp } from "src/firebase/firebase";

// 回答に返信する機能
export const writeAnswerComment = async (
  consulId: string,
  answerId: string,
  comment: string
): Promise<boolean> => {
  const ref = db
    .collection("consultations")
    .doc(consulId)
    .collection("answers")
    .doc(answerId);
  try {
    await ref.update({
      comment: comment,
      commentCreatedAt: timeStamp,
    });
    return true;
  } catch (error) {
    return false;
  }
};
