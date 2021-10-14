import { db, timeStamp } from "src/firebase/firebase";

// 補足を追加する機能
export const writeSupplement = async (
  docId: string,
  supplement: string
): Promise<boolean> => {
  const ref = db.collection("consultations").doc(docId);
  try {
    await ref.update({
      supplement: supplement,
      supplementCreatedAt: timeStamp,
    });
    return true;
  } catch (error) {
    return false;
  }
};
