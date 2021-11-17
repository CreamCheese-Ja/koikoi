import Link from "next/link";
import FavoriteIcon from "@material-ui/icons/Favorite";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import Divider from "@material-ui/core/Divider";
import styles from "styles/components/block/consultationArea.module.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authCheckState,
  consultationListState,
  displayConsulMoreButtonState,
  userProfileState,
} from "src/atoms/atom";
import { Dispatch, memo, SetStateAction, useEffect } from "react";
import { changeDateFormatAddTime } from "src/common/changeDateFormat";
import ListLikeButton from "../modules/buttons/ListLikeButton";
import { getConsultationList } from "src/firebase/firestore/consultations/get/getConsultationList";
import Category from "../atoms/others/Category";
import UserPhoto from "../atoms/others/UserPhoto";

type Props = {
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const ConsultationListArea = (props: Props) => {
  const { setRunning } = props;
  // 恋愛相談Listのstate
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);
  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);
  // もっと見るボタン表示の変更関数
  const setShowMoreButton = useSetRecoilState(displayConsulMoreButtonState);

  // いいね後に恋愛相談リストを更新する関数
  const updateConsulList = (likeDocId: string) => {
    const newDataList = consultationList.map((data) => {
      if (data.consultationId === likeDocId) {
        const newData = {
          ...data,
          numberOfLikes: data.numberOfLikes + 1,
          userLike: true,
        };
        return newData;
      } else {
        return data;
      }
    });
    setConsultationList(newDataList);
  };

  useEffect(() => {
    if (consultationList.length === 0) {
      setRunning(true);
    }
    // 恋愛相談リストを取得する関数
    const get = async (userId: string) => {
      const data = await getConsultationList(userId);
      if (data) {
        setConsultationList(data);
      }
      setRunning(false);
    };
    // authCheckがtrueになっていて、恋愛相談リストが空の場合に動作する
    if (!consultationList.length && authCheck) {
      get(userProfile.id);
      // もっと見るボタンの表示
      setShowMoreButton(true);
    }
  }, [authCheck]);

  return (
    <div>
      <Divider />
      {consultationList.map((consul) => (
        <div key={consul.consultationId}>
          <div className={styles.consultationArea}>
            <div className={styles.consultationTop}>
              <div className={styles.userArea}>
                <UserPhoto
                  photoURL={consul.user.photoURL}
                  width={30}
                  height={30}
                  userId={consul.user.id}
                />
                <div className={styles.userName}>{consul.user.name}</div>
              </div>
              <div className={styles.date}>
                {changeDateFormatAddTime(consul.createdAt)}
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
            <div>
              <Category categoryLabel={consul.category} />
            </div>
            <div className={styles.goodAndSolution}>
              <div className={styles.goodAndAnswer}>
                <div className={styles.goodButtonArea}>
                  {consul.userLike ? (
                    <div>
                      <FavoriteIcon color="primary" />
                    </div>
                  ) : (
                    <ListLikeButton
                      userId={consul.user.id}
                      collectionId="consultations"
                      docId={consul.consultationId}
                      userProfile={userProfile}
                      updateList={updateConsulList}
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

export default memo(ConsultationListArea);
