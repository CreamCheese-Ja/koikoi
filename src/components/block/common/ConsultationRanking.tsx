import React from "react";
import styles from "styles/components/block/common/allRanking.module.css";

const ConsultationRanking = () => {
  return (
    <div className={styles.rankingArea}>
      <h3>恋愛相談ランキング</h3>
      <div>
        <div>いいね数</div>
        <div>回答数</div>
      </div>
    </div>
  );
};

export default ConsultationRanking;