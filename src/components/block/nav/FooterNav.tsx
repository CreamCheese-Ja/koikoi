import React from "react";
import styles from "styles/components/block/nav/footerNav.module.css";

const FooterNav = () => {
  return (
    <div>
      <ul className={styles.navList}>
        <li>About</li>
        <li>利用規約</li>
        <li>プライバシー</li>
        <li>ご意見</li>
      </ul>
    </div>
  );
};

export default FooterNav;
