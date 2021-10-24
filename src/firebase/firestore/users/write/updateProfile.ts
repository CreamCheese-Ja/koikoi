import { db, timeStamp } from "src/firebase/firebase";

export const updateProfileData = async (
  userId: string,
  photoURL: string,
  message: string,
  gender: string,
  age: string,
  job: string,
  bloodType: string,
  sign: string
): Promise<boolean> => {
  const ref = db.collection("users").doc(userId);

  try {
    await ref.update({
      photoURL: photoURL,
      message: message,
      gender: gender,
      age: age,
      job: job,
      bloodType: bloodType,
      sign: sign,
      updatedAt: timeStamp,
    });
    return true;
  } catch (error) {
    return false;
  }
};
