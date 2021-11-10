import { Dispatch, SetStateAction, useEffect } from "react";
import Spinner from "src/components/atoms/progress/Spinner";
import { getUserRanking } from "src/firebase/firestore/common/get/getUserRanking";
import { UserLikeRanking } from "src/type";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import UserPhoto from "src/components/atoms/others/UserPhoto";
import styles from "styles/components/block/rankingListArea.module.css";
import { Divider } from "@material-ui/core";

type Props = {
  rankingList: UserLikeRanking;
  setRankingList: Dispatch<SetStateAction<UserLikeRanking>>;
  isFetchData: boolean;
  setIsFetchData: Dispatch<SetStateAction<boolean>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const UserLikeRankingList = (props: Props) => {
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
      const fetchData = await getUserRanking("numberOfLikes");
      if (fetchData) {
        const likeRanking = fetchData as UserLikeRanking;
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
                <div className={styles.rank}>{index + 1}</div>
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
              <div className={styles.count}>{data.numberOfLikes}</div>
              <div className={styles.label}>いいね</div>
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

export default UserLikeRankingList;
