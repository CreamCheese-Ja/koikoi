import { ReactNode } from "react";
import Header from "./block/Header";
import styles from "styles/layout.module.css";
import Footer from "./block/Footer";
import SideBar from "./block/SideBar";
import Dialogs from "./block/Dialogs";
import { useSetRecoilState } from "recoil";
import firebase from "../firebase/firebase";
import {
  defaultErrorAlertState,
  multipurposeErrorAlertState,
  userProfileState,
} from "src/atoms/atom";
import { useEffect } from "react";
import Alerts from "./block/Alerts";
import { getUserProfile } from "src/firebase/firestore";

type Props = {
  children: ReactNode;
};

export default function Layout({ children, ...props }: Props) {
  // ユーザープロフィール用の変更関数
  const setUserProfile = useSetRecoilState(userProfileState);

  // 共通のエラーアラート用の変更関数
  const setDefaultErrorAlert = useSetRecoilState(defaultErrorAlertState);

  // 多目的エラーアラート用の変更関数
  const setMultipurposeErrorAlert = useSetRecoilState(
    multipurposeErrorAlertState
  );

  useEffect(() => {
    // userがログインしていればプロフィールデータを取得しstateに保存
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const profileData = await getUserProfile(user.uid);
        if (typeof profileData !== "string") {
          setUserProfile({
            id: user.uid,
            name: profileData.name,
            photoURL: profileData.photoURL,
            gender: profileData.gender,
            age: profileData.age,
            job: profileData.job,
            bloodType: profileData.bloodType,
            sign: profileData.sign,
            numberOfBestAnswer: profileData.numberOfBestAnswer,
            numberOfLikes: profileData.numberOfLikes,
          });
        } else if (profileData === "error") {
          setDefaultErrorAlert(true);
        } else {
          setMultipurposeErrorAlert({ status: true, message: profileData });
        }
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
