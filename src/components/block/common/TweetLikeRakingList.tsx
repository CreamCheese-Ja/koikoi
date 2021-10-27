import React, { Dispatch, SetStateAction, useEffect } from "react";
import { getTweetRanking } from "src/firebase/firestore/common/get/getTweetRanking";
import { TweetLikeRanking } from "src/type";
import styles from "styles/components/block/rankingListArea.module.css";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import Link from "next/link";
import { Divider } from "@material-ui/core";
import Spinner from "src/components/atoms/progress/Spinner";

type Props = {
  rankingList: TweetLikeRanking;
  setRankingList: Dispatch<SetStateAction<TweetLikeRanking>>;
  isFetchData: boolean;
  setIsFetchData: Dispatch<SetStateAction<boolean>>;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const TweetLikeRakingList = (props: Props) => {
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
      const fetchData = await getTweetRanking("numberOfLikes");
      if (fetchData) {
        const likeRanking = fetchData as TweetLikeRanking;
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

export default TweetLikeRakingList;
