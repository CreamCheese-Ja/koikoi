import React from "react";
import ConsulRanking from "./common/ConsulRanking";
import TweetRanking from "./common/TweetRanking";
import UserRanking from "./common/UserRanking";

const SideBar = () => {
  const sideBarStyle = {
    minWidth: "300px",
    padding: "10px",
  };

  return (
    <aside style={sideBarStyle}>
      <UserRanking />
      <ConsulRanking />
      <TweetRanking />
    </aside>
  );
};

export default SideBar;
