import React from "react";
import styles from "styles/components/block/sideBar.module.css";
import ConsultationRanking from "../atoms/ConsultationRanking";
import TweetRanking from "../atoms/TweetRanking";
import UserRanking from "../atoms/UserRanking";

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
