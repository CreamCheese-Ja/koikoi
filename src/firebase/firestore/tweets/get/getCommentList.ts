import { db } from "src/firebase/firebase";
import { TweetCommentList } from "src/type";

// つぶやき詳細に対するコメントリストを取得(つぶやき詳細ページCSR用)
export const getCommentList = async (
  docId: string,
  userId: string
): Promise<TweetCommentList | null> => {
  // コメントへのリファレンス
  const commentsRef = db.collection("tweets").doc(docId).collection("comments");
  try {
    // 取得
    const commentsSnapshot = await commentsRef
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();
    // いいね済みかどうかを確認後リスト化
    const firstPage = await Promise.all(
      commentsSnapshot.docs.map(async (doc) => {
        // 回答にいいね済みかどうかを確認
        const userLike = await commentsRef
          .doc(doc.id)
          .collection("likes")
          .doc(userId)
          .get();
        const commentUserData = await doc.get("user.ref").get();
        return {
          user: {
            id: commentUserData.id,
            name: commentUserData.get("name"),
            photoURL: commentUserData.get("photoURL"),
          },
          commentId: doc.id,
          content: doc.get("content"),
          createdAt: doc.get("createdAt"),
          updatedAt: doc.get("updatedAt"),
          numberOfLikes: doc.get("numberOfLikes"),
          userLike: userLike.exists,
        };
      })
    );
    return firstPage;
  } catch (error) {
    return null;
  }
};
