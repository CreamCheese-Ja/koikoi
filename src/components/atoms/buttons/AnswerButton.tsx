import React, { useState } from "react";
import BasicExecutionButton from "./BasicExecutionButton";

const AnswerButton = () => {
  const answer = () => {};

  const [running, setRunning] = useState(false);

  return (
    <>
      <BasicExecutionButton
        onClick={answer}
        buttonLabel="回答する"
        disabled={running}
      />
    </>
  );
};

export default AnswerButton;
