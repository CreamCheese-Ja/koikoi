import { ReactNode } from "react";
import Header from "./block/Header";
import styles from "styles/layout.module.css";
import Footer from "./block/Footer";
import SideBar from "./block/SideBar";
import Dialogs from "./block/Dialogs";
import { useSetRecoilState } from "recoil";
import firebase from "../firebase/firebase";
import { userProfileState } from "src/atoms/atom";
import { useEffect } from "react";
import Alerts from "./atoms/Alerts";

type Props = {
  children: ReactNode;
};

export default function Layout({ children, ...props }: Props) {
  // ユーザープロフィール用の変更関数
  const setUserProfile = useSetRecoilState(userProfileState);

  useEffect(() => {
    // userがログインしていればプロフィールデータを取得しstateに保存
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const doc = await firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get();
          if (doc.exists) {
            const profileData = doc.data();
            console.log(profileData);
            setUserProfile({
              name: profileData?.name,
              photoURL: profileData?.photoURL,
              gender: profileData?.gender,
              age: profileData?.age,
              bloodType: profileData?.bloodType,
              sign: profileData?.sign,
              numberOfBestAnswer: profileData?.numberOfBestAnswer,
              numberOfLikes: profileData?.numberOfLikes,
            });
          }
        } catch (error) {}
      } else {
      }
    });
  }, []);

  return (
    <>
      <Header />
      <div className={styles.allContent}>
        <main {...props} className={styles.mainContent}>
          {children}
        </main>
        <SideBar />
      </div>
      <Footer />
      <Dialogs />
      <Alerts />
    </>
  );
}
