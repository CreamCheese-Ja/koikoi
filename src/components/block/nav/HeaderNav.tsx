import React, { memo } from "react";
import Link from "next/link";
import styles from "styles/components/block/nav/headerNav.module.css";

const HeaderNav = memo(() => {
  return (
    <nav>
      <ul className={styles.navList}>
        <li>
          <Link href="/">
            <a>恋愛相談</a>
          </Link>
        </li>
        <li>
          <Link href="/tweets">
            <a>つぶやき</a>
          </Link>
        </li>
        <li>記事・ニュース</li>
        <li>動画</li>
      </ul>
    </nav>
  );
});

export default HeaderNav;
