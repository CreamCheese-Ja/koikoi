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
  const ref = firebase.firestore().doc(`users/${userId}`);
  try {
    await firebase
      .firestore()
      .collection("consultations")
      .doc()
      .set({
        user: {
          ref: ref,
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
      });
    return "投稿しました。";
  } catch (error) {
    return "error";
  }
};

// 恋愛相談リストの型
export type ConsultationList = {
  user: {
    id: string;
    name: string;
    photoURL: string;
  };
  consultationId: string;
  category: string;
  title: string;
  content: string;
  supplement: string;
  solution: boolean;
  numberOfLikes: number;
  numberOfAnswer: number;
  createdAt: firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.FieldValue;
}[];

// 恋愛相談のリストを取得(最初の10件)
export const getSolutionList = async (
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
          userGood: good.exists,
        };
      })
    );
    return currentPage;
  } catch (error) {
    return "error";
  }
};
