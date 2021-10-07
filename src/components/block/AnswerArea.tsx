import { Divider } from "@material-ui/core";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  answerListState,
  authCheckState,
  getAnswerListRunningState,
  numberOfAnswerState,
  userProfileState,
} from "src/atoms/atom";
import { changeDateFormatAddTime } from "src/commonFunctions/changeDateFormat";
import AnswerLikeButton from "src/components/atoms/buttons/AnswerLikeButton";
import AnswerReplyButton from "src/components/atoms/buttons/AnswerReplyButton";
import BestAnswerButton from "src/components/atoms/buttons/BestAnswerButton";
import AnswerCommentField from "src/components/atoms/textFields/AnswerCommentField";
import { getConsultationAnswers } from "src/firebase/firestore";
import styles from "styles/components/atoms/answerArea.module.css";

type Props = {
  consultationId: string;
  consulUserId: string;
};

const AnswerArea = (props: Props) => {
  // 回答リストのstate
  const [answerList, setAnswerList] = useRecoilState(answerListState);

  // 回答数の値
  const numberOfAnswer = useRecoilValue(numberOfAnswerState);

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);

  // 回答リスト取得の実行中
  const setRunning = useSetRecoilState(getAnswerListRunningState);

  useEffect(() => {
    // 最初に回答リストを空にする
    setAnswerList([]);
    setRunning(true);
    // 回答リストを取得する関数
    const get = async (docId: string, userId: string) => {
      const answerData = await getConsultationAnswers(docId, userId);
      if (typeof answerData !== "string") {
        // ベストアンサーを振り分ける処理
        const newAnswerData = answerData.filter((data) => {
          return data.bestAnswer === false;
        });
        setAnswerList(newAnswerData);
        setRunning(false);
      }
    };
    if (authCheck) {
      get(props.consultationId, userProfile.id);
    }
  }, [authCheck]);

  return (
    <div>
      <h2 className={styles.areaTitle}>
        {numberOfAnswer !== 0 ? "回答" : "回答待ち"}
      </h2>
      <Divider />
      <div>
        {answerList.map((answer) => (
          <div key={answer.answerId}>
            <div className={styles.answerArea}>
              <div className={styles.answerTop}>
                <div className={styles.userArea}>
                  {answer.user.photoURL === "noImage" ? (
                    <Image src={noProfile} width={30} height={30} />
                  ) : (
                    <Image src={answer.user.photoURL} width={30} height={30} />
                  )}
                  <div className={styles.userName}>{answer.user.name}</div>
                </div>
                <div className={styles.date}>
                  {changeDateFormatAddTime(answer.createdAt) + "に回答"}
                </div>
              </div>
              <p className={styles.content}>{answer.content}</p>
              <div className={styles.likeAndAnswerArea}>
                <div className={styles.iconArea}>
                  <AnswerLikeButton
                    consulDocId={props.consultationId}
                    answerDocId={answer.answerId}
                    likeUserId={answer.user.id}
                    userProfile={userProfile}
                    answerList={answerList}
                    setAnswerList={setAnswerList}
                    useLike={answer.userLike}
                    numberOfLikes={answer.numberOfLikes}
                  />
                  {props.consulUserId === userProfile.id &&
                  answer.bestAnswer === false ? (
                    <BestAnswerButton
                      consulId={props.consultationId}
                      answerId={answer.answerId}
                      answerUserId={answer.user.id}
                      answerList={answerList}
                      setAnswerList={setAnswerList}
                      answerComment={answer.comment}
                    />
                  ) : (
                    <div></div>
                  )}
                </div>

                {props.consulUserId === userProfile.id &&
                answer.comment === "" ? (
                  <AnswerReplyButton />
                ) : (
                  <div></div>
                )}
              </div>
              {props.consulUserId === userProfile.id &&
              answer.comment === "" ? (
                <div>
                  <AnswerCommentField
                    userProfile={userProfile}
                    consulId={props.consultationId}
                    answerId={answer.answerId}
                    consulUserId={props.consulUserId}
                    answerList={answerList}
                    setAnswerList={setAnswerList}
                  />
                </div>
              ) : (
                <div></div>
              )}
              {answer.comment === "" ? (
                <div></div>
              ) : (
                <div className={styles.commentArea}>
                  <div className={styles.commentTop}>
                    <div className={styles.comment}>相談者のコメント</div>
                    {answer.commentCreatedAt === null ? (
                      <div></div>
                    ) : (
                      <div className={styles.commentDate}>
                        {changeDateFormatAddTime(answer.commentCreatedAt)}
                      </div>
                    )}
                  </div>
                  <p className={styles.commentContent}>{answer.comment}</p>
                </div>
              )}
            </div>
            <Divider />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerArea;
