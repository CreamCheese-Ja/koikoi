import { Divider } from "@material-ui/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { changeDateFormatAddTime } from "src/common/changeDateFormat";
import { getUserConsultationList } from "src/firebase/firestore/consultations/get/getUserConsultationList";
import { UserConsulList } from "src/type";
import styles from "styles/components/block/userListArea.module.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import Category from "src/components/atoms/others/Category";
import Link from "next/link";
import Spinner from "../atoms/progress/Spinner";
import ExecutionButton from "../atoms/buttons/ExecutionButton";
import { getNextUserConsultationList } from "src/firebase/firestore/consultations/get/getNextUserConsultationList";
import { SetterOrUpdater } from "recoil";
import DeleteButton from "../atoms/buttons/DeleteButton";

type Props = {
  userId: string;
  userConsulList: UserConsulList;
  setUserConsulList: Dispatch<SetStateAction<UserConsulList>>;
  isFetchConsul: boolean;
  setIsFetchConsul: Dispatch<SetStateAction<boolean>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  currentUserId: string;
  setError: SetterOrUpdater<{
    status: boolean;
    message: string;
  }>;
  openDeleteDialog: (id: string, postName: string) => void;
};

const UserConsulListArea = (props: Props) => {
  const {
    userId,
    userConsulList,
    setUserConsulList,
    isFetchConsul,
    setIsFetchConsul,
    running,
    setRunning,
    currentUserId,
    setError,
    openDeleteDialog,
  } = props;

  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    if (userConsulList.length === 0 && !isFetchConsul) {
      setRunning(true);
    }
    const getPage = async () => {
      const firstPage = await getUserConsultationList(userId);
      if (firstPage) {
        setUserConsulList(firstPage);
      }
      setIsFetchConsul(true);
      setRunning(false);
    };
    if (!isFetchConsul) {
      getPage();
    }
  }, []);

  // 次のページ取得
  const fetchNextPage = async () => {
    setRunning(true);
    // 次の10件を取得
    const nextPage = await getNextUserConsultationList(
      userId,
      userConsulList[userConsulList.length - 1].createdAt
    );
    if (nextPage) {
      setUserConsulList([...userConsulList, ...nextPage]);
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
      {userConsulList.map((consul) => (
        <div key={consul.consultationId}>
          <div className={styles.dataArea}>
            <p className={styles.date}>
              {changeDateFormatAddTime(consul.createdAt)}
            </p>
            <Link href={`/consultations/${consul.consultationId}`}>
              <a>
                <p className={styles.title}>{consul.title}</p>
              </a>
            </Link>
            <div>
              <Category categoryLabel={consul.category} />
            </div>
            <div className={styles.pointAndSolutionArea}>
              <div className={styles.pointArea}>
                <div className={styles.point}>
                  <div>
                    <FavoriteBorderIcon
                      fontSize="small"
                      style={{ color: "#b0b0b0" }}
                    />
                  </div>
                  <div>{consul.numberOfLikes}</div>
                </div>
                <div className={styles.point}>
                  <div className={styles.answerCount}>
                    <InsertCommentOutlinedIcon
                      fontSize="small"
                      style={{ color: "#b0b0b0" }}
                    />
                  </div>
                  <div>{consul.numberOfAnswer}</div>
                </div>
                {currentUserId === userId ? (
                  <DeleteButton
                    onClick={() =>
                      openDeleteDialog(consul.consultationId, "consul")
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
              <div>
                {consul.solution ? (
                  <div className={styles.solution}>解決済み</div>
                ) : (
                  <div className={styles.noSolution}>回答待ち</div>
                )}
              </div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
      {userConsulList.length === 0 && isFetchConsul ? (
        <p className={styles.noneMessage}>恋愛相談はありません</p>
      ) : (
        <div></div>
      )}
      <div className={styles.nextButton}>
        {running ? (
          <Spinner />
        ) : showMoreButton && userConsulList.length >= 10 ? (
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

export default UserConsulListArea;
