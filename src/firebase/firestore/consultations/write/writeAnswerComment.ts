import firebase from "src/firebase/firebase";

// 回答に返信する機能
export const writeAnswerComment = async (
  consulId: string,
  answerId: string,
  comment: string
): Promise<string> => {
  const ref = firebase
    .firestore()
    .collection("consultations")
    .doc(consulId)
    .collection("answers")
    .doc(answerId);
  try {
    await ref.update({
      comment: comment,
      commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return "回答に返信しました。";
  } catch (error) {
    return "error";
  }
};
