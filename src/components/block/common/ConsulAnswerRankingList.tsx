import { Dispatch, SetStateAction, useEffect } from "react";
import { getConsulRanking } from "src/firebase/firestore/common/get/getConsulRanking";
import { ConsulAnswerRanking } from "src/type";
import styles from "styles/components/block/rankingListArea.module.css";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { Divider } from "@material-ui/core";
import Spinner from "src/components/atoms/progress/Spinner";
import Link from "next/link";

type Props = {
  rankingList: ConsulAnswerRanking;
  setRankingList: Dispatch<SetStateAction<ConsulAnswerRanking>>;
  isFetchData: boolean;
  setIsFetchData: Dispatch<SetStateAction<boolean>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const ConsulAnswerRankingList = (props: Props) => {
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
      const fetchData = await getConsulRanking("numberOfAnswer");
      if (fetchData) {
        const likeRanking = fetchData as ConsulAnswerRanking;
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
                <div className={styles.icon}>
                  <EmojiEventsIcon style={{ color: rankColors[index] }} />
                </div>
              ) : (
                <div className={styles.rank}>{index + 1}</div>
              )}
              <Link href={`/consultations/${data.id}`}>
                <a>
                  <p className={styles.title}>{data.title}</p>
                </a>
              </Link>
            </div>
            <div className={styles.pointArea}>
              <div className={styles.count}>{data.numberOfAnswer}</div>
              <div className={styles.label}>回答</div>
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

export default ConsulAnswerRankingList;
