import { Divider } from "@material-ui/core";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  authCheckState,
  bestAnswerState,
  isSolutionState,
} from "src/atoms/atom";
import { changeDateFormatAddTime } from "src/commonFunctions/changeDateFormat";
import { getBestAnswerData } from "src/firebase/firestore/consultations/get/firestore";
import { ProfileItem } from "src/type";
import styles from "styles/components/block/bestAnswerArea.module.css";
import AnswerLikeButton from "../atoms/buttons/AnswerLikeButton";
import StarIcon from "@material-ui/icons/Star";

type Props = {
  consulId: string;
  solution: boolean;
  userProfile: ProfileItem;
};

const BestAnswerArea = (props: Props) => {
  // 解決済み、回答待ちstateの値
  const isSolution = useRecoilValue(isSolutionState);

  // ベストアンサーの変更関数
  const [bestAnswer, setBestAnswer] = useRecoilState(bestAnswerState);

  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);

  useEffect(() => {
    // 最初にベストアンサーstateを空にする
    setBestAnswer({});
    // ベストアンサー取得の関数
    const get = async (consulId: string) => {
      const bestAnswerData = await getBestAnswerData(consulId);
      if (bestAnswerData) {
        setBestAnswer(bestAnswerData);
      }
    };
    if (authCheck && props.solution) {
      get(props.consulId);
    }
  }, [authCheck]);

  return (
    <>
      {isSolution ? (
        <div className={styles.container}>
          <div className={styles.titleArea}>
            <h2 className={styles.areaTitle}>ベストアンサー</h2>
            <StarIcon style={{ color: "#fdd835" }} fontSize="large" />
          </div>
          <Divider />
          {"user" in bestAnswer ? (
            <div className={styles.answerArea}>
              <div className={styles.answerTop}>
                <div className={styles.userArea}>
                  {bestAnswer.user.photoURL === "noImage" ? (
                    <Image src={noProfile} width={30} height={30} />
                  ) : (
                    <Image
                      src={bestAnswer.user.photoURL}
                      width={30}
                      height={30}
                    />
                  )}
                  <div className={styles.userName}>{bestAnswer.user.name}</div>
                </div>
                <div className={styles.date}>
                  {changeDateFormatAddTime(bestAnswer.createdAt) + "に回答"}
                </div>
              </div>
              <p className={styles.content}>{bestAnswer.content}</p>
              <div className={styles.likeAndAnswerArea}>
                <div className={styles.iconArea}>
                  <AnswerLikeButton
                    consulDocId={props.consulId}
                    answerDocId={bestAnswer.answerId}
                    likeUserId={bestAnswer.user.id}
                    userProfile={props.userProfile}
                    bestAnswer={bestAnswer}
                    setBestAnswer={setBestAnswer}
                    useLike={bestAnswer.userLike}
                    numberOfLikes={bestAnswer.numberOfLikes}
                  />
                </div>
              </div>
              {bestAnswer.comment === "" ? (
                <div></div>
              ) : (
                <div className={styles.commentArea}>
                  <div className={styles.commentTop}>
                    <div className={styles.comment}>相談者のコメント</div>
                    {bestAnswer.commentCreatedAt === null ? (
                      <div></div>
                    ) : (
                      <div className={styles.commentDate}>
                        {changeDateFormatAddTime(bestAnswer.commentCreatedAt)}
                      </div>
                    )}
                  </div>
                  <p className={styles.commentContent}>{bestAnswer.comment}</p>
                </div>
              )}
            </div>
          ) : (
            <div></div>
          )}
          <Divider />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BestAnswerArea;
