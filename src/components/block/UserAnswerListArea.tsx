import { Dispatch, SetStateAction, useEffect } from "react";
import { changeDateFormatAddTime } from "src/commonFunctions/changeDateFormat";
import { getUserAnswerList } from "src/firebase/firestore/consultations/get/getUserAnswerList";
import { UserAnswerList } from "src/type";
import styles from "styles/components/block/userListArea.module.css";
import Link from "next/link";
import { Divider } from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

type Props = {
  userId: string;
  userAnswerList: UserAnswerList;
  setUserAnswerList: Dispatch<SetStateAction<UserAnswerList>>;
  isFetchAnswer: boolean;
  setIsFetchAnswer: Dispatch<SetStateAction<boolean>>;
};

const UserAnswerListArea = (props: Props) => {
  const {
    userId,
    userAnswerList,
    setUserAnswerList,
    isFetchAnswer,
    setIsFetchAnswer,
  } = props;

  useEffect(() => {
    const getPage = async () => {
      const firstPage = await getUserAnswerList(userId);
      if (firstPage) {
        setUserAnswerList(firstPage);
        setIsFetchAnswer(true);
      }
    };
    if (!isFetchAnswer) {
      getPage();
    }
  }, []);

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
                <p>
                  {answer.content.length <= 100
                    ? answer.content
                    : answer.content.slice(0, 100) + "..."}
                </p>
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
    </div>
  );
};

export default UserAnswerListArea;
