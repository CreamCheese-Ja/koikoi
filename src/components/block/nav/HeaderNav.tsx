import React, { memo } from "react";
import Link from "next/link";
import styles from "styles/components/block/nav/headerNav.module.css";
import useMedia from "use-media";

const HeaderNav = memo(() => {
  const isWide = useMedia({ minWidth: 961 });
  return (
    <>
      {isWide ? (
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/consultations">
                <a>恋愛相談</a>
              </Link>
            </li>
            <li>
              <Link href="/tweets">
                <a>つぶやき</a>
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
});

export default HeaderNav;
