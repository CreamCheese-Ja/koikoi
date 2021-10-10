import firebase from "src/firebase/firebase";

// つぶやきのcreate関数(後でデータを取得するためdocumentIdを返す)
export const createTweet = async (
  category: string,
  content: string,
  userId: string
): Promise<string | boolean> => {
  const userRef = firebase.firestore().doc(`users/${userId}`);
  try {
    const ref = firebase.firestore().collection("tweets").doc();
    await ref.set({
      user: {
        ref: userRef,
      },
      category: category,
      content: content,
      numberOfLikes: 0,
      numberOfComments: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    const tweetId = ref.id;
    return tweetId;
  } catch (error) {
    return false;
  }
};
