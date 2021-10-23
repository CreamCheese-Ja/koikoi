import React, { memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { numberOfAnswerState } from "src/atoms/atom";
import styles from "styles/components/atoms/others/numberOfAnswer.module.css";

type Props = {
  initialNumberOfAnswer: number;
};

const NumberOfAnswer = memo((props: Props) => {
  const { initialNumberOfAnswer } = props;

  const [numberOfAnswer, setNumberOfAnswer] =
    useRecoilState(numberOfAnswerState);

  useEffect(() => {
    setNumberOfAnswer(initialNumberOfAnswer);
  }, []);

  return (
    <>
      <span className={styles.answer}>{numberOfAnswer}</span>回答
    </>
  );
});

export default NumberOfAnswer;
