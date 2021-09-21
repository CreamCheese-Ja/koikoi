import React from "react";
import { useRecoilValue } from "recoil";
import { supplementsState } from "src/atoms/atom";
import styles from "styles/components/atoms/supplementArea.module.css";

type Props = {
  supplement: string;
  consulId: string;
  supplementCreatedAt: string;
};

const SupplementArea = (props: Props) => {
  const supplements = useRecoilValue(supplementsState);

  return (
    <>
      {props.supplement === "" ? (
        !(props.consulId in supplements) ? (
          <div></div>
        ) : (
          <div className={styles.supplementArea}>
            <div className={styles.supplement}>補足</div>
            <p className={styles.content}>{supplements[props.consulId]}</p>
          </div>
        )
      ) : (
        <div className={styles.supplementArea}>
          <div className={styles.top}>
            <div className={styles.supplement}>補足</div>
            <div className={styles.date}>{props.supplementCreatedAt}</div>
          </div>

          <p className={styles.content}>{props.supplement}</p>
        </div>
      )}
    </>
  );
};

export default SupplementArea;
