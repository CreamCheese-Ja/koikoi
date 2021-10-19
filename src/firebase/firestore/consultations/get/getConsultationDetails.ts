import { changeDateFormatAddTime } from "src/common/changeDateFormat";
import { db } from "src/firebase/firebase";
import { ConsultationDetails } from "src/type";

// 恋愛相談詳細を1件取得(恋愛相談詳細ページSSR用)
export const getConsultationDetails = async (
  docId: string
): Promise<ConsultationDetails | null> => {
  // 恋愛相談ドキュメントのリファレンス
  const consulRef = db.collection("consultations").doc(docId);

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
        consultationId: doc.id,
        category: doc.get("category"),
        title: doc.get("title"),
        content: doc.get("content"),
        supplement: doc.get("supplement"),
        solution: doc.get("solution"),
        numberOfLikes: doc.get("numberOfLikes"),
        numberOfAnswer: doc.get("numberOfAnswer"),
        createdAt: changeDateFormatAddTime(doc.get("createdAt")),
        updatedAt: changeDateFormatAddTime(doc.get("updatedAt")),
        supplementCreatedAt: changeDateFormatAddTime(
          doc.get("supplementCreatedAt")
        ),
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
