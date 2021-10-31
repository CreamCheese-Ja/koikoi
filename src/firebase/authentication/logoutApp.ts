import firebase from "src/firebase/firebase";

export const logoutApp = async (): Promise<boolean> => {
  try {
    await firebase.auth().signOut();
    return true;
  } catch (error) {
    return false;
  }
};
