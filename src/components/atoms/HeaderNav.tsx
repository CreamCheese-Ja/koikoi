import React from "react";
import styles from "styles/components/atoms/headerNav.module.css";

const HeaderNav = () => {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>恋愛相談</li>
        <li>つぶやき</li>
        <li>記事・ニュース</li>
        <li>動画</li>
      </ul>
    </nav>
  );
};

export default HeaderNav;
