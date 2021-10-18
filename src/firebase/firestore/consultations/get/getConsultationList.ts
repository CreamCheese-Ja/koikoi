import { db } from "src/firebase/firebase";
import { ConsultationList } from "src/type";

// 恋愛相談のリスト(最初の10件)を取得し加工した値を返す関数
export const getConsultationList = async (
  userId: string
): Promise<ConsultationList | null> => {
  const ref = db.collection("consultations");
  try {
    const querySnapshot = await ref
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    // 取得したリストにuserがいいねしているかどうかのフラグを付け加えて返す
    const firstPage = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const userLike = await ref
          .doc(doc.id)
          .collection("likes")
          .doc(userId)
          .get();
        const userData = await doc.get("user.ref").get();
        return {
          user: {
            id: userData.id,
            name: userData.get("name"),
            photoURL: userData.get("photoURL"),
          },
          consultationId: doc.id,
          category: doc.get("category"),
          title: doc.get("title"),
          content: doc.get("content"),
          supplement: doc.get("supplement"),
          solution: doc.get("solution"),
          numberOfLikes: doc.get("numberOfLikes"),
          numberOfAnswer: doc.get("numberOfAnswer"),
          createdAt: doc.get("createdAt"),
          updatedAt: doc.get("updatedAt"),
          userLike: userLike.exists,
        };
      })
    );
    return firstPage;
  } catch (error) {
    return null;
  }
};
