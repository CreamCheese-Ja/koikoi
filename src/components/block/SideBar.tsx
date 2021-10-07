import React from "react";
import styles from "styles/components/block/sideBar.module.css";
import ConsultationRanking from "./common/ConsultationRanking";
import TweetRanking from "./common/TweetRanking";
import UserRanking from "./common/UserRanking";

const SideBar = () => {
  return (
    <aside className={styles.sideBar}>
      <UserRanking />
      <ConsultationRanking />
      <TweetRanking />
    </aside>
  );
};

export default SideBar;
