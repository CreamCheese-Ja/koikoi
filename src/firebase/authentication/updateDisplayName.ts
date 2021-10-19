import firebase from "src/firebase/firebase";

export const updateDisplayName = async (name: string): Promise<boolean> => {
  try {
    await firebase.auth().currentUser?.updateProfile({
      displayName: name,
    });
    return true;
  } catch (error) {
    return false;
  }
};
