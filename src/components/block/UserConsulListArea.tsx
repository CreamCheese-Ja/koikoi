import { Divider } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { changeDateFormatAddTime } from "src/commonFunctions/changeDateFormat";
import { getUserConsultationList } from "src/firebase/firestore/consultations/get/getUserConsultationList";
import { UserConsulList } from "src/type";
import styles from "styles/components/block/userListArea.module.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InsertCommentOutlinedIcon from "@material-ui/icons/InsertCommentOutlined";
import Category from "src/components/atoms/others/Category";
import Link from "next/link";

type Props = {
  userId: string;
  userConsulList: UserConsulList;
  setUserConsulList: Dispatch<SetStateAction<UserConsulList>>;
};

const UserConsulListArea = (props: Props) => {
  const { userId, userConsulList, setUserConsulList } = props;

  useEffect(() => {
    const getPage = async () => {
      const firstPage = await getUserConsultationList(userId);
      if (firstPage) {
        setUserConsulList(firstPage);
      }
    };
    if (userConsulList.length === 0) {
      getPage();
    }
  }, []);

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
    </div>
  );
};

export default UserConsulListArea;
