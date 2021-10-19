import { db } from "src/firebase/firebase";

// ユーザー名が使用できるかどうか確認するメソッド
export const getIsNameAvailable = async (name: string) => {
  try {
    const doc = await db.collection("users").where("name", "==", name).get();
    if (doc.empty) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
