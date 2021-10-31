import firebase from "src/firebase/firebase";

export const getEmailAuthCredential = (
  email: string,
  password: string
): firebase.auth.AuthCredential => {
  const credential = firebase.auth.EmailAuthProvider.credential(
    email,
    password
  );
  return credential;
};
