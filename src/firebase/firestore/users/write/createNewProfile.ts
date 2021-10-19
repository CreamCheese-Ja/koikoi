import { db, timeStamp } from "src/firebase/firebase";

export const createNewProfile = async (
  userId: string,
  name: string
): Promise<boolean> => {
  try {
    await db.doc(`users/${userId}`).set({
      name: name,
      photoURL: "noImage",
      gender: "未設定",
      age: "未設定",
      job: "未設定",
      bloodType: "未設定",
      sign: "未設定",
      message: "",
      numberOfBestAnswer: 0,
      numberOfLikes: 0,
      createdAt: timeStamp,
      updatedAt: timeStamp,
    });
    return true;
  } catch (error) {
    return false;
  }
};
