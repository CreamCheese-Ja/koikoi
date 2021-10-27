import React, { useState } from "react";
import TabBar from "src/components/atoms/others/TabBar";
import { TweetCommentRanking, TweetLikeRanking } from "src/type";
import styles from "styles/components/block/common/allRanking.module.css";
import TweetCommentRankingList from "./TweetCommentRankingList";
import TweetLikeRakingList from "./TweetLikeRakingList";

const TweetRanking = () => {
  const [tabValue, setTabValue] = useState(0);
  const [running, setRunning] = useState(false);

  const [likeList, setLikeList] = useState<TweetLikeRanking>([]);
  const [commentList, setCommentList] = useState<TweetCommentRanking>([]);

  const [isFetchLikeList, setIsFetchLikeList] = useState(false);
  const [isFetchCommentList, setIsFetchCommentList] = useState(false);

  const tabItem = ["いいね数", "コメント数"];

  return (
    <div className={styles.rankingArea}>
      <h3>つぶやきランキング</h3>
      <TabBar
        tabItem={tabItem}
        value={tabValue}
        setValue={setTabValue}
        tabWidth="80px"
        centered={false}
      />
      {tabValue === 0 ? (
        <TweetLikeRakingList
          rankingList={likeList}
          setRankingList={setLikeList}
          isFetchData={isFetchLikeList}
          setIsFetchData={setIsFetchLikeList}
          running={running}
          setRunning={setRunning}
        />
      ) : (
        <div></div>
      )}
      {tabValue === 1 ? (
        <TweetCommentRankingList
          rankingList={commentList}
          setRankingList={setCommentList}
          isFetchData={isFetchCommentList}
          setIsFetchData={setIsFetchCommentList}
          running={running}
          setRunning={setRunning}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TweetRanking;
