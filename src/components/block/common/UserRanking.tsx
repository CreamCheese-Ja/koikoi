import React, { useState } from "react";
import { useRecoilState } from "recoil";
import {
  userBestAnswerRankingListState,
  userLikeRankingListState,
} from "src/atoms/atom";
import TabBar from "src/components/atoms/others/TabBar";
import styles from "styles/components/block/common/allRanking.module.css";
import UserBestAnswerRankingList from "./UserBestAnswerRankingList";
import UserLikeRankingList from "./UserLikeRankingList";

const UserRanking = () => {
  const [tabValue, setTabValue] = useState(0);
  const [running, setRunning] = useState(false);

  const [likeList, setLikeList] = useRecoilState(userLikeRankingListState);
  const [bestAnswerList, setBestAnswerList] = useRecoilState(
    userBestAnswerRankingListState
  );

  const [isFetchLikeList, setIsFetchLikeList] = useState(false);
  const [isFetchBestAnswerList, setIsFetchBestAnswerList] = useState(false);

  const tabItem = ["いいね数", "ベストアンサー数"];

  return (
    <div className={styles.rankingArea}>
      <h3>ユーザーランキング</h3>
      <TabBar
        tabItem={tabItem}
        value={tabValue}
        setValue={setTabValue}
        tabWidth="80px"
        centered={false}
      />
      {tabValue === 0 ? (
        <UserLikeRankingList
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
        <UserBestAnswerRankingList
          rankingList={bestAnswerList}
          setRankingList={setBestAnswerList}
          isFetchData={isFetchBestAnswerList}
          setIsFetchData={setIsFetchBestAnswerList}
          running={running}
          setRunning={setRunning}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default UserRanking;
