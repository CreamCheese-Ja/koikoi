import React, { useState } from "react";
import TabBar from "src/components/atoms/others/TabBar";
import { ConsulAnswerRanking, ConsulLikeRanking } from "src/type";
import styles from "styles/components/block/common/allRanking.module.css";
import ConsulAnswerRankingList from "./ConsulAnswerRankingList";
import ConsulLikeRankingList from "./ConsulLikeRankingList";

const ConsulRanking = () => {
  const [tabValue, setTabValue] = useState(0);
  const [running, setRunning] = useState(false);

  const [likeList, setLikeList] = useState<ConsulLikeRanking>([]);
  const [answerList, setAnswerList] = useState<ConsulAnswerRanking>([]);

  const [isFetchLikeList, setIsFetchLikeList] = useState(false);
  const [isFetchAnswerList, setIsFetchAnswerList] = useState(false);

  const tabItem = ["いいね数", "回答数"];

  return (
    <div className={styles.rankingArea}>
      <h3>恋愛相談ランキング</h3>
      <TabBar
        tabItem={tabItem}
        value={tabValue}
        setValue={setTabValue}
        tabWidth="80px"
        centered={false}
      />
      {tabValue === 0 ? (
        <ConsulLikeRankingList
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
        <ConsulAnswerRankingList
          rankingList={answerList}
          setRankingList={setAnswerList}
          isFetchData={isFetchAnswerList}
          setIsFetchData={setIsFetchAnswerList}
          running={running}
          setRunning={setRunning}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ConsulRanking;
