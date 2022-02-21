import { ReactNode } from "react";
import Header from "./block/Header";
import styles from "styles/layout.module.css";
import Footer from "./block/Footer";
import SideBar from "./block/SideBar";
import Dialogs from "./block/common/Dialogs";
import { useSetRecoilState } from "recoil";
import firebase from "../firebase/firebase";
import {
  authCheckState,
  consultationListState,
  createProfileDialogState,
  tweetListState,
  userProfileState,
} from "src/atoms/atom";
import { useEffect } from "react";
import Alerts from "./block/common/Alerts";
import { getUserProfile } from "src/firebase/firestore/users/get/getUserProfile";
import BottomNavigationBar from "./modules/others/BottomNavigationBar";
import FloatingButton from "./atoms/buttons/FloatingButton";

type Props = {
  children: ReactNode;
};

export default function Layout({ children, ...props }: Props) {
  // ユーザープロフィール用の変更関数
  const setUserProfile = useSetRecoilState(userProfileState);
  // 恋愛相談リストの変更関数
  const setConsultationList = useSetRecoilState(consultationListState);
  // つぶやきリストの変更関数
  const setTweetList = useSetRecoilState(tweetListState);
  // onAuthStateChangedでチェック有無の変更関数
  const setAuthCheck = useSetRecoilState(authCheckState);
  // プロフィール作成ダイアログを開く
  const setCreateProfileDialog = useSetRecoilState(createProfileDialogState);

  useEffect(() => {
    // userがログインしていればプロフィールデータを取得しstateに保存
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        // ログインしたら、最初にauthCheckを空にする
        setAuthCheck(false);
        // ログインしたら恋愛相談リスト、つぶやきリストを空にする(ユーザのリセット処理なので必要)
        setConsultationList([]);
        setTweetList([]);
        // ユーザー情報をfirestoreから取得する
        const profileData = await getUserProfile(user.uid);
        if (profileData) {
          setUserProfile(profileData);
        } else {
          // NOTE: 新規登録時は、メール確認ができていないため、↓の条件が必要 & socialログインかどうかを判別するためにも使える
          if (firebase.auth().currentUser?.emailVerified) {
            // 会員登録済み & email確認済みでプロフィール情報がなかったときの処理(socialLoginも含む)
            // 名前を決めるフォームを開く
            setCreateProfileDialog(true);
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
      <BottomNavigationBar />
      <FloatingButton />
      <Dialogs />
      <Alerts />
    </>
  );
}
