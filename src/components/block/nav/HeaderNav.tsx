import React, { memo } from "react";
import styles from "styles/components/block/nav/headerNav.module.css";

const HeaderNav = memo(() => {
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
});

export default HeaderNav;
