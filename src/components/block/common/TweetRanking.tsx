import React from "react";
import styles from "styles/components/block/common/allRanking.module.css";

const TweetRanking = () => {
  return (
    <div className={styles.rankingArea}>
      <h3>つぶやきランキング</h3>
      <div>
        <div>いいね数</div>
        <div>回答数</div>
      </div>
    </div>
  );
};

export default TweetRanking;
