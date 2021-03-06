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
  pageId: string;
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
  openDeleteDialog: (id: string, subId: string, postName: string) => void;
};

const UserConsulListArea = (props: Props) => {
  const {
    pageId,
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
      const firstPage = await getUserConsultationList(pageId);
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

  // ?????????????????????
  const fetchNextPage = async () => {
    setRunning(true);
    // ??????10????????????
    const nextPage = await getNextUserConsultationList(
      pageId,
      userConsulList[userConsulList.length - 1].createdAt
    );
    if (nextPage) {
      setUserConsulList([...userConsulList, ...nextPage]);
      // ????????????10????????????????????????????????????????????????
      if (nextPage.length !== 10) {
        setShowMoreButton(false);
      }
    } else {
      setError({ status: true, message: "?????????????????????????????????????????????" });
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
                {currentUserId === pageId ? (
                  <DeleteButton
                    onClick={() =>
                      openDeleteDialog(consul.consultationId, "", "consul")
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
              <div>
                {consul.solution ? (
                  <div className={styles.solution}>????????????</div>
                ) : (
                  <div className={styles.noSolution}>????????????</div>
                )}
              </div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
      {userConsulList.length === 0 && isFetchConsul ? (
        <p className={styles.noneMessage}>??????????????????????????????</p>
      ) : (
        <div></div>
      )}
      <div className={styles.nextButton}>
        {running ? (
          <Spinner />
        ) : showMoreButton && userConsulList.length >= 10 ? (
          <ExecutionButton
            onClick={fetchNextPage}
            buttonLabel="???????????????"
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
