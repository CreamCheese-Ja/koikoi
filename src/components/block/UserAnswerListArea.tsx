import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { changeDateFormatAddTime } from "src/common/changeDateFormat";
import { getUserAnswerList } from "src/firebase/firestore/consultations/get/getUserAnswerList";
import { UserAnswerList } from "src/type";
import styles from "styles/components/block/userListArea.module.css";
import Link from "next/link";
import { Divider } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { useSetRecoilState } from "recoil";
import { multipurposeErrorAlertState } from "src/atoms/atom";
import Spinner from "../atoms/progress/Spinner";
import ExecutionButton from "../atoms/buttons/ExecutionButton";
import { getNextUserAnswerList } from "src/firebase/firestore/consultations/get/getNextUserAnswerList";
import DeleteButton from "../atoms/buttons/DeleteButton";

type Props = {
  pageId: string;
  userAnswerList: UserAnswerList;
  setUserAnswerList: Dispatch<SetStateAction<UserAnswerList>>;
  isFetchAnswer: boolean;
  setIsFetchAnswer: Dispatch<SetStateAction<boolean>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  currentUserId: string;
  openDeleteDialog: (id: string, subId: string, postName: string) => void;
};

const UserAnswerListArea = (props: Props) => {
  const {
    pageId,
    userAnswerList,
    setUserAnswerList,
    isFetchAnswer,
    setIsFetchAnswer,
    running,
    setRunning,
    currentUserId,
    openDeleteDialog,
  } = props;

  const [showMoreButton, setShowMoreButton] = useState(true);
  // エラーstate
  const setError = useSetRecoilState(multipurposeErrorAlertState);

  useEffect(() => {
    if (userAnswerList.length === 0 && !isFetchAnswer) {
      setRunning(true);
    }
    const getPage = async () => {
      const firstPage = await getUserAnswerList(pageId);
      if (firstPage) {
        setUserAnswerList(firstPage);
      }
      setIsFetchAnswer(true);
      setRunning(false);
    };
    if (!isFetchAnswer) {
      getPage();
    }
  }, []);

  // 次のページ取得
  const fetchNextPage = async () => {
    setRunning(true);
    // 次の10件を取得
    const nextPage = await getNextUserAnswerList(
      pageId,
      userAnswerList[userAnswerList.length - 1].createdAt
    );
    if (nextPage) {
      setUserAnswerList([...userAnswerList, ...nextPage]);
      // 取得数が10未満であればボタンを非表示にする
      if (nextPage.length !== 10) {
        setShowMoreButton(false);
      }
    } else {
      setError({ status: true, message: "ページを取得できませんでした。" });
    }
    setRunning(false);
  };

  return (
    <div className={styles.container}>
      {userAnswerList.map((answer) =>
        answer.consultationId !== "none" ? (
          <div key={answer.consultationId}>
            <div className={styles.dataArea}>
              <p className={styles.date}>
                {changeDateFormatAddTime(answer.createdAt)}
              </p>
              <Link href={`/consultations/${answer.consultationId}`}>
                <a>
                  <p className={styles.title}>{answer.consultationTitle}</p>
                </a>
              </Link>
              <div className={styles.answerArea}>
                <Link href={`/consultations/${answer.consultationId}`}>
                  <a>
                    <p>
                      {answer.content.length <= 100
                        ? answer.content
                        : answer.content.slice(0, 100) + "..."}
                    </p>
                  </a>
                </Link>
                <div className={styles.pointArea}>
                  <div className={styles.point}>
                    <div>
                      <FavoriteBorderIcon
                        fontSize="small"
                        style={{ color: "#b0b0b0" }}
                      />
                    </div>
                    <div>{answer.numberOfLikes}</div>
                  </div>
                  {currentUserId === pageId ? (
                    <DeleteButton
                      onClick={() =>
                        openDeleteDialog(
                          answer.consultationId,
                          answer.answerId,
                          "answer"
                        )
                      }
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <Divider />
          </div>
        ) : (
          <div></div>
        )
      )}
      {userAnswerList.length === 0 && isFetchAnswer ? (
        <p className={styles.noneMessage}>恋愛相談の回答はありません</p>
      ) : (
        <div></div>
      )}
      <div className={styles.nextButton}>
        {running ? (
          <Spinner />
        ) : showMoreButton && userAnswerList.length >= 10 ? (
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

export default UserAnswerListArea;
