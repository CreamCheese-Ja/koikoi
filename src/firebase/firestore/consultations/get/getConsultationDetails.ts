import { changeDateFormatAddTime } from "src/commonFunctions/changeDateFormat";
import firebase from "src/firebase/firebase";
import { ConsultationDetails } from "src/type";

// 恋愛相談詳細を1件取得(恋愛相談詳細ページSSR用)
export const getConsultationDetails = async (
  docId: string
): Promise<ConsultationDetails | string> => {
  // 恋愛相談ドキュメントのリファレンス
  const consulRef = firebase.firestore().collection("consultations").doc(docId);

  try {
    // 恋愛相談ドキュメントを取得
    const doc = await consulRef.get();
    if (doc !== undefined) {
      const userData = await doc.get("user.ref").get();

      // 恋愛情報ドキュメントと回答リストをまとめたオブジェクトを返す
      // SSRでTimestampを扱うときは最初にstingに変換する
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
      return "error";
    }
  } catch (error) {
    return "error";
  }
};
