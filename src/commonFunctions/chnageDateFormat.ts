import firebase from "src/firebase/firebase";

// 日付のフォーマットを変更する関数
export const changeDateFormat = (
  timestamp: firebase.firestore.Timestamp
): string => {
  const y = `${timestamp.toDate().getFullYear()}年`;
  const m = `${("0" + (timestamp.toDate().getMonth() + 1)).slice(-2)}月`;
  const d = `${("0" + timestamp.toDate().getDate()).slice(-2)}日`;
  return y + m + d;
};
