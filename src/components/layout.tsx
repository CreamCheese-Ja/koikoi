import { ReactNode } from "react";
import Header from "./block/Header";
import styles from "styles/layout.module.css";
import Footer from "./block/Footer";
import SideBar from "./block/SideBar";
import Dialogs from "./block/Dialogs";
import { useSetRecoilState } from "recoil";
import firebase from "../firebase/firebase";
import {
  authCheckState,
  consultationListState,
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

  // 恋愛相談リストの変更関数
  const setConsultationList = useSetRecoilState(consultationListState);

  // onAuthStateChangedでチェック有無の変更関数
  const setAuthCheck = useSetRecoilState(authCheckState);

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
        // ログインしたら、最初にauthCheckを空にする
        setAuthCheck(false);
        // ログインしたら恋愛相談リストを空にする(ユーザのリセット処理なので必要)
        setConsultationList([]);
        // ユーザー情報をfirestoreから取得する
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
            message: profileData.message,
            numberOfBestAnswer: profileData.numberOfBestAnswer,
            numberOfLikes: profileData.numberOfLikes,
          });
        } else if (profileData === "error") {
          setDefaultErrorAlert(true);
        } else {
          if (firebase.auth().currentUser?.emailVerified) {
            setMultipurposeErrorAlert({ status: true, message: profileData });
          }
        }
      }
      setAuthCheck(true);
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
