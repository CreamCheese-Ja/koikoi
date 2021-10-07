import firebase from "src/firebase/firebase";

// 補足を追加する機能
export const writeSupplement = async (
  docId: string,
  supplement: string
): Promise<string> => {
  const ref = firebase.firestore().collection("consultations").doc(docId);
  try {
    await ref.update({
      supplement: supplement,
      supplementCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    return "補足を追加しました。";
  } catch (error) {
    return "error";
  }
};
