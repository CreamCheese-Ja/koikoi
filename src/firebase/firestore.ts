import { changeDateFormatAddTime } from "src/commonFunctions/changeDateFormat";
import {
  AnswerList,
  ConsultationData,
  ConsultationDetails,
  ConsultationList,
} from "src/type";
import firebase from "./firebase";

// ユーザーのプロフィール情報を取得する関数
export const getUserProfile = async (
  userUid: string | undefined
): Promise<string | firebase.firestore.DocumentData> => {
  try {
    const doc = await firebase
      .firestore()
      .collection("users")
      .doc(userUid)
      .get();
    if (doc.exists) {
      const profile = doc.data();
      if (profile !== undefined) {
        return profile;
      } else {
        return "error";
      }
    } else {
      return "ユーザー情報を取得出来ませんでした。";
    }
  } catch (error) {
    return "ユーザー情報を取得出来ませんでした。";
  }
};

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

// 恋愛相談のリスト(最初の10件)を取得し加工した値を返す関数
export const processingConsultationList = async (
  userId: string
): Promise<ConsultationList | string> => {
  const ref = firebase.firestore().collection("consultations");
  try {
    const querySnapshot = await ref
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    // 取得したリストにuserがいいねしているかどうかのフラグを付け加えて返す
    const currentPage = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const good = await ref
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
          userLike: good.exists,
        };
      })
    );
    return currentPage;
  } catch (error) {
    return "error";
  }
};

// 恋愛相談のリスト(次の10件)を取得し加工した値を返す関数
export const processingNextConsultationList = async (
  userId: string,
  cursor: firebase.firestore.Timestamp
): Promise<ConsultationList | string> => {
  const ref = firebase.firestore().collection("consultations");
  try {
    const querySnapshot = await ref
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(10)
      .get();
    // 取得したリストにuserがいいねしているかどうかのフラグを付け加えて返す
    const currentPage = await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const good = await ref
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
          userLike: good.exists,
        };
      })
    );
    return currentPage;
  } catch (error) {
    return "error";
  }
};

// ユーザーが投稿した最新の恋愛相談を1件取得
export const getNewConsultationData = async (
  docId: string
): Promise<ConsultationData | string> => {
  const ref = firebase.firestore().collection("consultations").doc(docId);
  try {
    const doc = await ref.get();
    if (doc !== undefined) {
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
        userLike: false,
      };
    } else {
      return "error";
    }
  } catch (error) {
    return "error";
  }
};

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

// 恋愛相談詳細に対する回答リストを取得(恋愛相談詳細ページCSR用)
export const getConsultationAnswers = async (
  docId: string,
  userId: string
): Promise<AnswerList | string> => {
  // 回答へのリファレンス
  const answersRef = firebase
    .firestore()
    .collection("consultations")
    .doc(docId)
    .collection("answers");
  try {
    // 取得した恋愛相談ドキュメントに中の回答を5つ取得
    const answersSnapshot = await answersRef
      .orderBy("createdAt", "desc")
      .limit(5)
      .get();

    // 回答のuserRefを値に直し、いいね済みかどうかを確認後リスト化
    const answersList = await Promise.all(
      answersSnapshot.docs.map(async (doc) => {
        // 回答にいいね済みかどうかを確認
        const userLike = await answersRef
          .doc(doc.id)
          .collection("likes")
          .doc(userId)
          .get();
        const answerUserData = await doc.get("user.ref").get();
        return {
          user: {
            id: answerUserData.id,
            name: answerUserData.get("name"),
            photoURL: answerUserData.get("photoURL"),
          },
          answerId: doc.id,
          content: doc.get("content"),
          createdAt: doc.get("createdAt"),
          updatedAt: doc.get("updatedAt"),
          numberOfLikes: doc.get("numberOfLikes"),
          bestAnswer: doc.get("bestAnswer"),
          comment: doc.get("comment"),
          commentCreatedAt: doc.get("commentCreatedAt"),
          userLike: userLike.exists,
        };
      })
    );
    return answersList;
  } catch (error) {
    return "error";
  }
};

// 恋愛相談の回答create機能
export const createAnswer = async (
  consultationId: string,
  userId: string,
  content: string
): Promise<string> => {
  const batch = firebase.firestore().batch();
  const userRef = firebase.firestore().doc(`users/${userId}`);
  // 回答のcreate処理
  const answerRef = firebase
    .firestore()
    .collection("consultations")
    .doc(consultationId)
    .collection("answers")
    .doc(userId);
  batch.set(answerRef, {
    user: {
      ref: userRef,
    },
    content: content,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    numberOfLikes: 0,
    bestAnswer: false,
    comment: "",
    commentCreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  // 回答数のインクリメント処理
  const consultationRef = firebase
    .firestore()
    .collection("consultations")
    .doc(consultationId);
  batch.update(consultationRef, {
    numberOfAnswer: firebase.firestore.FieldValue.increment(1),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  });

  try {
    await batch.commit();
    return "投稿しました";
  } catch (error) {
    return "error";
  }
};

// ユーザーがすでに回答を投稿しているかどうかチェックする
export const checkExistsAnswer = async (
  userId: string,
  consulDocId: string
): Promise<boolean> => {
  const ref = firebase
    .firestore()
    .collection("consultations")
    .doc(consulDocId)
    .collection("answers")
    .doc(userId);
  const doc = await ref.get();
  if (doc.exists) {
    return true;
  } else {
    return false;
  }
};
