import { Divider } from "@material-ui/core";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  answerListState,
  authCheckState,
  getAnswerListRunningState,
  numberOfAnswerState,
  showAnswerReplyFieldState,
  userProfileState,
} from "src/atoms/atom";
import { changeDateFormatAddTime } from "src/common/changeDateFormat";
import AnswerLikeButton from "src/components/modules/buttons/AnswerLikeButton";
import BestAnswerButton from "src/components/modules/buttons/BestAnswerButton";
import AnswerCommentField from "src/components/modules/textFields/AnswerCommentField";
import { getAnswerList } from "src/firebase/firestore/consultations/get/getAnswerList";
import styles from "styles/components/block/answerArea.module.css";
import UserPhoto from "../atoms/others/UserPhoto";
import BasicButton from "../atoms/buttons/BasicButton";
import Spinner from "../atoms/progress/Spinner";
import ExecutionButton from "../atoms/buttons/ExecutionButton";
import { useGetNextAnswerList } from "src/hooks/useGetNextAnswerList";

type Props = {
  consultationId: string;
  consulUserId: string;
};

const AnswerArea = (props: Props) => {
  const { consultationId, consulUserId } = props;
  // 回答リストのstate
  const [answerList, setAnswerList] = useRecoilState(answerListState);
  // 回答数の値
  const numberOfAnswer = useRecoilValue(numberOfAnswerState);
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);
  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);
  // 実行中
  const setRunning = useSetRecoilState(getAnswerListRunningState);
  // 返信フィールド開閉
  const [showAnswerReplyField, setShowAnswerReplyField] = useRecoilState(
    showAnswerReplyFieldState
  );

  // 次ページ取得のhook
  const { running, isButtonDisplay, fetchNextPage } = useGetNextAnswerList(
    answerList,
    setAnswerList,
    consultationId,
    userProfile.id
  );

  useEffect(() => {
    // 最初に回答リストを空にする
    setAnswerList([]);
    setRunning(true);
    // 回答リストを取得する関数
    const get = async (docId: string, userId: string) => {
      const answerListData = await getAnswerList(docId, userId);
      if (answerListData) {
        // ベストアンサーを振り分ける処理
        const newAnswerListData = answerListData.filter((data) => {
          return data.bestAnswer === false;
        });
        setAnswerList(newAnswerListData);
        setRunning(false);
      }
    };
    if (authCheck) {
      get(consultationId, userProfile.id);
    }
  }, [authCheck]);

  return (
    <div className={styles.container}>
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
                  <UserPhoto
                    photoURL={answer.user.photoURL}
                    width={30}
                    height={30}
                    userId={answer.user.id}
                  />
                  <div className={styles.userName}>{answer.user.name}</div>
                </div>
                <div className={styles.date}>
                  {changeDateFormatAddTime(answer.createdAt)}
                </div>
              </div>
              <p className={styles.content}>{answer.content}</p>
              <div className={styles.likeAndAnswerArea}>
                <div className={styles.iconArea}>
                  <AnswerLikeButton
                    consulDocId={consultationId}
                    answerDocId={answer.answerId}
                    likeUserId={answer.user.id}
                    userProfile={userProfile}
                    answerList={answerList}
                    setAnswerList={setAnswerList}
                    userLike={answer.userLike}
                    numberOfLikes={answer.numberOfLikes}
                  />
                </div>
                {consulUserId === userProfile.id && answer.comment === "" ? (
                  <BasicButton
                    onClick={() =>
                      setShowAnswerReplyField(!showAnswerReplyField)
                    }
                    buttonLabel={
                      showAnswerReplyField ? "入力欄を閉じる" : "返信する"
                    }
                    variant="text"
                  />
                ) : (
                  <div></div>
                )}
              </div>
              {consulUserId === userProfile.id && answer.comment === "" ? (
                <div>
                  <AnswerCommentField
                    userProfile={userProfile}
                    consulId={consultationId}
                    answerId={answer.answerId}
                    consulUserId={consulUserId}
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
              {consulUserId === userProfile.id &&
              answer.bestAnswer === false ? (
                <BestAnswerButton
                  consulId={consultationId}
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
            <Divider />
          </div>
        ))}
      </div>
      <div className={styles.moreButtonArea}>
        {running ? (
          <Spinner />
        ) : isButtonDisplay && answerList.length !== 0 ? (
          <ExecutionButton
            onClick={fetchNextPage}
            buttonLabel="もっと見る"
            disabled={running}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default AnswerArea;
