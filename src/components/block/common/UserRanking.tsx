import React from "react";
import styles from "styles/components/block/common/allRanking.module.css";

const UserRanking = () => {
  return (
    <div className={styles.rankingArea}>
      <h3>ユーザーランキング</h3>
      <div>
        <div>いいね数</div>
        <div>ベストアンサー数</div>
      </div>
    </div>
  );
};

export default UserRanking;
