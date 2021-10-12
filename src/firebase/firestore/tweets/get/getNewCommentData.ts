import firebase from "src/firebase/firebase";
import { TweetCommentData } from "src/type";

// ユーザーが投稿した新規の回答を１件取得する
export const getNewCommentData = async (
  tweetId: string,
  commentId: string
): Promise<TweetCommentData | null> => {
  const ref = firebase
    .firestore()
    .collection("tweets")
    .doc(tweetId)
    .collection("comments")
    .doc(commentId);
  try {
    const doc = await ref.get();
    if (doc) {
      const userData = await doc.get("user.ref").get();
      return {
        user: {
          id: userData.id,
          name: userData.get("name"),
          photoURL: userData.get("photoURL"),
        },
        commentId: doc.id,
        content: doc.get("content"),
        numberOfLikes: doc.get("numberOfLikes"),
        createdAt: doc.get("createdAt"),
        updatedAt: doc.get("updatedAt"),
        userLike: false,
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
