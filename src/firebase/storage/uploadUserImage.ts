import { storage } from "src/firebase/firebase";

// オブジェクトurlをblobに戻す(storage保存のため)
const toBlob = async (url: string): Promise<Blob | null> => {
  const imageData = await fetch(url);
  if (imageData) {
    const blob = await imageData.blob();
    return blob;
  } else {
    return null;
  }
};

// プロフィール画像をstorageにアップロード
export const uploadUserImage = async (
  userId: string,
  imageUrl: string
): Promise<boolean> => {
  const ref = storage.ref().child(`users/${userId}/${userId}.png`);
  try {
    const blob = await toBlob(imageUrl);
    if (blob) {
      await ref.put(blob);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
