import React, { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { isSolutionState } from "src/atoms/atom";
import styles from "styles/components/atoms/others/solution.module.css";

type Props = {
  solution: boolean;
};

const Solution = (props: Props) => {
  const { solution } = props;
  const [isSolution, setIsSolution] = useRecoilState(isSolutionState);

  useEffect(() => {
    setIsSolution(solution);
  }, []);

  return (
    <>
      {isSolution ? (
        <div className={styles.solution}>解決済み</div>
      ) : (
        <div className={styles.noSolution}>回答待ち</div>
      )}
    </>
  );
};
export default memo(Solution);
