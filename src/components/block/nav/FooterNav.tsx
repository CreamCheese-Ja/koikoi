import React from "react";
import styles from "styles/components/block/nav/footerNav.module.css";

const FooterNav = () => {
  return (
    <div>
      <ul className={styles.navList}>
        <li>利用規約</li>
        <li>プライバシー</li>
        <li>お問い合わせ</li>
      </ul>
    </div>
  );
};

export default FooterNav;
