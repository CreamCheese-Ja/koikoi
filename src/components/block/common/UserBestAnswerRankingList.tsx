import { Divider } from "@material-ui/core";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import UserPhoto from "src/components/atoms/others/UserPhoto";
import Spinner from "src/components/atoms/progress/Spinner";
import { getUserRanking } from "src/firebase/firestore/common/get/getUserRanking";
import { UserBestAnswerRanking } from "src/type";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import styles from "styles/components/block/rankingListArea.module.css";

type Props = {
  rankingList: UserBestAnswerRanking;
  setRankingList: Dispatch<SetStateAction<UserBestAnswerRanking>>;
  isFetchData: boolean;
  setIsFetchData: Dispatch<SetStateAction<boolean>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const UserBestAnswerRankingList = (props: Props) => {
  const {
    rankingList,
    setRankingList,
    isFetchData,
    setIsFetchData,
    running,
    setRunning,
  } = props;

  useEffect(() => {
    if (rankingList.length === 0) {
      setRunning(true);
    }
    const getPage = async () => {
      const fetchData = await getUserRanking("numberOfBestAnswer");
      if (fetchData) {
        const likeRanking = fetchData as UserBestAnswerRanking;
        setRankingList(likeRanking);
      }
      setIsFetchData(true);
      setRunning(false);
    };
    if (!isFetchData) {
      getPage();
    }
  }, []);

  const rankColors = ["gold", "silver", "#a17136"];

  return (
    <div>
      {rankingList.map((data, index) => (
        <div key={data.id}>
          <div className={styles.dataArea}>
            <div className={styles.contentArea}>
              {index < 3 ? (
                <div>
                  <EmojiEventsIcon style={{ color: rankColors[index] }} />
                </div>
              ) : (
                <div className={styles.rank}>{index}</div>
              )}
              <UserPhoto
                photoURL={data.photoURL}
                width={30}
                height={30}
                userId={data.id}
              />
              <p className={styles.name}>{data.name}</p>
            </div>
            <div className={styles.pointArea}>
              <div className={styles.count}>{data.numberOfBestAnswer}</div>
              <div className={styles.label}>BA</div>
            </div>
          </div>
          <Divider />
        </div>
      ))}
      <div style={{ paddingTop: "20px" }}>
        {running ? <Spinner /> : <div></div>}
      </div>
    </div>
  );
};

export default UserBestAnswerRankingList;
