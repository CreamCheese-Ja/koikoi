import { storage } from "src/firebase/firebase";

// プロフィール画像のURLを取得
export const getUserImageUrl = async (
  userId: string
): Promise<string | null> => {
  const ref = storage.ref().child(`users/${userId}/${userId}.png`);
  try {
    const url = await ref.getDownloadURL();
    const imageUrl = url as string;
    return imageUrl;
  } catch (error) {
    return null;
  }
};
