import { db } from "src/firebase/firebase";
import { ProfileItem } from "src/type";

// ユーザーのプロフィール情報を取得する関数
export const getUserProfile = async (
  userUid: string
): Promise<ProfileItem | null> => {
  try {
    const doc = await db.collection("users").doc(userUid).get();
    if (doc) {
      return {
        id: doc.id,
        name: doc.get("name"),
        photoURL: doc.get("photoURL"),
        gender: doc.get("gender"),
        age: doc.get("age"),
        job: doc.get("job"),
        bloodType: doc.get("bloodType"),
        sign: doc.get("sign"),
        message: doc.get("message"),
        numberOfBestAnswer: doc.get("numberOfBestAnswer"),
        numberOfLikes: doc.get("numberOfLikes"),
      };
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
