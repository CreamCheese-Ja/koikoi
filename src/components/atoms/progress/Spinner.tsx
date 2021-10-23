import React, { memo } from "react";
import styles from "styles/components/atoms/progress/spinner.module.css";

const Spinner = memo(() => {
  return (
    <div className={styles.spinnerArea}>
      <div className={`${styles.cpSpinner} ${styles.cpBubble}`}></div>
    </div>
  );
});

export default Spinner;
