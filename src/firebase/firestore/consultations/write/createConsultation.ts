import firebase from "src/firebase/firebase";

// 恋愛相談のcreate関数
export const createConsultation = async (
  category: string,
  title: string,
  content: string,
  userId: string
): Promise<string> => {
  const userRef = firebase.firestore().doc(`users/${userId}`);
  try {
    const ref = firebase.firestore().collection("consultations").doc();
    await ref.set({
      user: {
        ref: userRef,
      },
      category: category,
      title: title,
      content: content,
      supplement: "",
      solution: false,
      numberOfLikes: 0,
      numberOfAnswer: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      supplementCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const refId = ref.id;
    return refId;
  } catch (error) {
    return "error";
  }
};
