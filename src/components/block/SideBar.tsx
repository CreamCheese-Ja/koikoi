import React from "react";
import styles from "styles/components/block/sideBar.module.css";
import ConsulRanking from "./common/ConsulRanking";
import TweetRanking from "./common/TweetRanking";
import UserRanking from "./common/UserRanking";

const SideBar = () => {
  return (
    <aside className={styles.sideBar}>
      <UserRanking />
      <ConsulRanking />
      <TweetRanking />
    </aside>
  );
};

export default SideBar;
