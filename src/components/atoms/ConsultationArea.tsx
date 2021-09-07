import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Divider from "@material-ui/core/Divider";
import styles from "styles/components/atoms/consultationArea.module.css";

import { useRecoilState, useRecoilValue } from "recoil";
import {
  authCheckState,
  consultationListState,
  userProfileState,
} from "src/atoms/atom";
import { getSolutionList } from "src/firebase/firestore";
import { useEffect } from "react";
import { getCurrentUser } from "src/firebase/authentication";

const ConsultationArea = () => {
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);

  useEffect(() => {
    // 恋愛相談リストを取得する関数
    const get = async (userId: string) => {
      console.log(1, userProfile.id);
      const data = await getSolutionList(userId);
      console.log(2, data);
      if (typeof data !== "string") {
        setConsultationList(data);
      }
    };
    // 恋愛相談listが空 + authCheckが終わっている場合に動作する
    if (!consultationList.length && authCheck) {
      if (userProfile.id !== "noUser") {
        // ログインユーザーの情報を取得
        const user = getCurrentUser();
        if (user !== null) {
          get(user.uid);
        } else {
          get(userProfile.id);
        }
      } else {
        get(userProfile.id);
      }
    }
  }, [authCheck]);

  const category = (label: string) => {
    let style = null;
    switch (label) {
      case "出会い":
        style = { backgroundColor: "#ffb74d" };
        break;
      case "恋人未満":
        style = { backgroundColor: "#ff8a65" };
        break;
      case "恋人":
        style = { backgroundColor: "#f06292" };
        break;
      case "結婚":
        style = { backgroundColor: "#e57373" };
        break;
      case "浮気":
        style = { backgroundColor: "#64b5f6" };
        break;
      case "不倫":
        style = { backgroundColor: "#ba68c8" };
        break;
      case "その他":
        style = { backgroundColor: "#a1887f" };
        break;
      default:
        style = { backgroundColor: "#fff" };
        break;
    }
    return (
      <div {...{ style }} className={styles.category}>
        {label}
      </div>
    );
  };

  return (
    <div>
      {consultationList.map((consul, index) => (
        <div key={index}>
          <div className={styles.consultationArea}>
            <div className={styles.consultationTop}>
              <div className={styles.userArea}>
                {consul.user.photoURL === "noProfile" ? (
                  <Image src={noProfile} width={30} height={30} />
                ) : (
                  <Image src={noProfile} width={30} height={30} />
                )}
                <div className={styles.userName}>{consul.user.name}</div>
              </div>
              <div className={styles.date}>投稿日時</div>
            </div>
            <h2>{consul.title}</h2>
            <p>{consul.content}</p>
            {category(consul.category)}
            <div className={styles.goodAndSolution}>
              <div className={styles.goodButtonArea}>
                <FavoriteBorderIcon />
                <div className={styles.goodCount}>{consul.numberOfLikes}</div>
              </div>
              <div className={styles.solution}>解決済み</div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default ConsultationArea;
