import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { numberOfAnswerState } from "src/atoms/atom";
import styles from "styles/components/atoms/others/numberOfAnswer.module.css";

type Props = {
  initialNumberOfAnswer: number;
};

const NumberOfAnswer = (props: Props) => {
  const [numberOfAnswer, setNumberOfAnswer] =
    useRecoilState(numberOfAnswerState);

  useEffect(() => {
    setNumberOfAnswer(props.initialNumberOfAnswer);
  }, []);

  return (
    <>
      <span className={styles.answer}>{numberOfAnswer}</span>回答
    </>
  );
};

export default NumberOfAnswer;
