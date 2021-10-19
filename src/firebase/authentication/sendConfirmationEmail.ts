import firebase from "src/firebase/firebase";

export const sendConfirmationEmail = async (): Promise<boolean> => {
  try {
    await firebase.auth().currentUser?.sendEmailVerification();
    return true;
  } catch (error) {
    return false;
  }
};
