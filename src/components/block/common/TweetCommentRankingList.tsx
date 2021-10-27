import { Dispatch, SetStateAction, useEffect } from "react";
import { getTweetRanking } from "src/firebase/firestore/common/get/getTweetRanking";
import { TweetCommentRanking } from "src/type";
import styles from "styles/components/block/rankingListArea.module.css";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { Divider } from "@material-ui/core";
import Spinner from "src/components/atoms/progress/Spinner";
import Link from "next/link";

type Props = {
  rankingList: TweetCommentRanking;
  setRankingList: Dispatch<SetStateAction<TweetCommentRanking>>;
  isFetchData: boolean;
  setIsFetchData: Dispatch<SetStateAction<boolean>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const TweetCommentRankingList = (props: Props) => {
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
      const fetchData = await getTweetRanking("numberOfComments");
      if (fetchData) {
        const likeRanking = fetchData as TweetCommentRanking;
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
              <Link href={`/tweets/${data.id}`}>
                <a>
                  <p className={styles.title}>
                    {data.content.length <= 30
                      ? data.content
                      : data.content.slice(0, 30) + "..."}
                  </p>
                </a>
              </Link>
            </div>
            <div className={styles.pointArea}>
              <div className={styles.count}>{data.numberOfComments}</div>
              <div className={styles.label}>コメント</div>
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

export default TweetCommentRankingList;
