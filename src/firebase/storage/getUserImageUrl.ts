import { storage } from "src/firebase/firebase";

// プロフィール画像のURLを取得
export const getUserImageUrl = async (userId: string) => {
  const ref = storage.ref().child(`users/${userId}/${userId}.png`);

  try {
    const url = await ref.getDownloadURL();
    return url;
  } catch (error) {
    return null;
  }
};
