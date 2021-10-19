import { TweetDetails } from "src/type";
import { db } from "src/firebase/firebase";
import { changeDateFormatAddTime } from "src/common/changeDateFormat";

// 恋愛相談詳細を1件取得(恋愛相談詳細ページSSR用)
export const getTweetDetails = async (
  docId: string
): Promise<TweetDetails | null> => {
  // 恋愛相談ドキュメントのリファレンス
  const consulRef = db.collection("tweets").doc(docId);
  try {
    // 恋愛相談ドキュメントを取得
    const doc = await consulRef.get();
    if (doc) {
      const userData = await doc.get("user.ref").get();
      // SSRでTimestampを扱うときは先にstingに変換する必要がある
      return {
        user: {
          id: userData.id,
          name: userData.get("name"),
          photoURL: userData.get("photoURL"),
        },
        tweetId: doc.id,
        category: doc.get("category"),
        content: doc.get("content"),
        numberOfLikes: doc.get("numberOfLikes"),
        numberOfComments: doc.get("numberOfComments"),
        createdAt: changeDateFormatAddTime(doc.get("createdAt")),
        updatedAt: changeDateFormatAddTime(doc.get("updatedAt")),
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
