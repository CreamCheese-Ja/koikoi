import Image from "next/image";
import Link from "next/link";
import noProfile from "public/images/no-profile.png";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import Divider from "@material-ui/core/Divider";
import styles from "styles/components/atoms/consultationArea.module.css";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authCheckState,
  consultationListState,
  spinnerState,
  userProfileState,
} from "src/atoms/atom";
import { processingConsultationList } from "src/firebase/firestore";
import { useEffect } from "react";
import { changeDateFormat } from "src/commonFunctions/chnageDateFormat";
import ConsulListLikeButton from "./buttons/ConsulListLikeButton";

// カテゴリーの色を決める関数
export const consulCategory = (label: string) => {
  let style = null;
  switch (label) {
    case "出会い":
      style = { backgroundColor: "#ffb74d" };
      break;
    case "片想い":
      style = { backgroundColor: "#81c784" };
      break;
    case "恋人未満":
      style = { backgroundColor: "#ff8a65" };
      break;
    case "恋人":
      style = { backgroundColor: "#f06292" };
      break;
    case "復縁":
      style = { backgroundColor: "#4db6ac" };
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

const ConsultationArea = () => {
  // 恋愛相談Listのstate
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);

  // ローディングの変更関数
  const setRunning = useSetRecoilState(spinnerState);

  useEffect(() => {
    if (consultationList.length === 0) {
      setRunning(true);
    }
    // 恋愛相談リストを取得する関数
    const get = async (userId: string) => {
      const data = await processingConsultationList(userId);
      if (typeof data !== "string") {
        setConsultationList(data);
        setRunning(false);
      }
    };
    // 恋愛相談listが空 + authCheckがtrueになっている場合に動作する
    if (!consultationList.length && authCheck) {
      get(userProfile.id);
      // console.log("恋愛相談リストの取得");
    }
  }, [authCheck]);

  return (
    <div>
      {consultationList.map((consul) => (
        <div key={consul.consultationId}>
          <div className={styles.consultationArea}>
            <div className={styles.consultationTop}>
              <div className={styles.userArea}>
                {consul.user.photoURL === "noImage" ? (
                  <Image src={noProfile} width={30} height={30} />
                ) : (
                  <Image src={consul.user.photoURL} width={30} height={30} />
                )}
                <div className={styles.userName}>{consul.user.name}</div>
              </div>
              <div className={styles.date}>
                {changeDateFormat(consul.createdAt) + "に投稿"}
              </div>
            </div>
            <Link href={`/consultations/${consul.consultationId}`}>
              <a>
                <h2 className={styles.consulTitle}>
                  {consul.title.length <= 30
                    ? consul.title
                    : consul.title.slice(0, 30) + "..."}
                </h2>
              </a>
            </Link>
            <p>
              {consul.content.length <= 100
                ? consul.content
                : consul.content.slice(0, 100) + "..."}
            </p>
            {consulCategory(consul.category)}
            <div className={styles.goodAndSolution}>
              <div className={styles.goodAndAnswer}>
                <div className={styles.goodButtonArea}>
                  {consul.userLike ? (
                    <div>
                      <FavoriteIcon color="primary" />
                    </div>
                  ) : (
                    <ConsulListLikeButton
                      userId={consul.user.id}
                      consultationId={consul.consultationId}
                    />
                  )}
                  <div className={styles.goodCount}>{consul.numberOfLikes}</div>
                </div>
                <div className={styles.numberOfAnswerArea}>
                  <div className={styles.commentIcon}>
                    <InsertCommentOutlinedIcon />
                  </div>

                  <div className={styles.answerCount}>
                    {consul.numberOfAnswer}
                  </div>
                </div>
              </div>

              {consul.solution ? (
                <div className={styles.solution}>解決済み</div>
              ) : (
                <div className={styles.noSolution}>回答待ち</div>
              )}
            </div>
          </div>
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default ConsultationArea;
