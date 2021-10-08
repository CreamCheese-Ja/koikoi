import Image from "next/image";
import Link from "next/link";
import noProfile from "public/images/no-profile.png";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import Divider from "@material-ui/core/Divider";
import styles from "styles/components/block/consultationArea.module.css";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authCheckState,
  consultationListState,
  displayConsulMoreButtonState,
  spinnerState,
  userProfileState,
} from "src/atoms/atom";
import { useEffect } from "react";
import { changeDateFormat } from "src/commonFunctions/changeDateFormat";
import ConsulListLikeButton from "../modules/buttons/ConsulListLikeButton";
import { getConsultationList } from "src/firebase/firestore/consultations/get/getConsultationList";
import Category from "../atoms/others/Category";

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

  // もっと見るボタン表示の変更関数
  const setMoreButtonDisplay = useSetRecoilState(displayConsulMoreButtonState);

  useEffect(() => {
    if (consultationList.length === 0) {
      setRunning(true);
    }
    // 恋愛相談リストを取得する関数
    const get = async (userId: string) => {
      const data = await getConsultationList(userId);
      if (typeof data !== "string") {
        setConsultationList(data);
        setRunning(false);
      }
    };
    // authCheckがtrueになっていて、恋愛相談リストが空の場合に動作する
    if (!consultationList.length && authCheck) {
      get(userProfile.id);
      // もっと見るボタンの表示
      setMoreButtonDisplay(true);
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
                  <Image
                    src={noProfile}
                    width={30}
                    height={30}
                    alt="userPhoto"
                  />
                ) : (
                  <Image
                    src={consul.user.photoURL}
                    width={30}
                    height={30}
                    alt="userPhoto"
                  />
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
            <Category categoryLabel={consul.category} />
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
