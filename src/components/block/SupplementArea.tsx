import React, { memo } from "react";
import { useRecoilValue } from "recoil";
import { supplementsState } from "src/atoms/atom";
import styles from "styles/components/block/supplementArea.module.css";

type Props = {
  supplement: string;
  consulId: string;
  supplementCreatedAt: string;
};

const SupplementArea = memo((props: Props) => {
  const { supplement, consulId, supplementCreatedAt } = props;

  const supplements = useRecoilValue(supplementsState);

  return (
    <>
      {supplement === "" ? (
        !(consulId in supplements) ? (
          <div></div>
        ) : (
          <div className={styles.supplementArea}>
            <div className={styles.supplement}>補足</div>
            <p className={styles.content}>{supplements[consulId]}</p>
          </div>
        )
      ) : (
        <div className={styles.supplementArea}>
          <div className={styles.top}>
            <div className={styles.supplement}>補足</div>
            <div className={styles.date}>{supplementCreatedAt}</div>
          </div>

          <p className={styles.content}>{supplement}</p>
        </div>
      )}
    </>
  );
});

export default SupplementArea;
