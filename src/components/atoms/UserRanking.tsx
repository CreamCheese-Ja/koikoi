import React from "react";
import styles from "styles/components/atoms/allRanking.module.css";

const UserRanking = () => {
  return (
    <div className={styles.rankingArea}>
      <h3>ユーザーランキング</h3>
      <div>
        <p>いいね数</p>
        <p>ベストアンサー数</p>
      </div>
    </div>
  );
};

export default UserRanking;
