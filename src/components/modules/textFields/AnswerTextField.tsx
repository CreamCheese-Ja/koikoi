import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { answerState } from "src/atoms/atom";
import MultilineTextField from "../../atoms/textFields/MultilineTextField";
import Button from "@material-ui/core/Button";

type Props = {
  running: boolean;
};

const AnswerTextField = (props: Props) => {
  const { running } = props;
  const [answer, setAnswer] = useRecoilState(answerState);

  // 内容の消去
  const deleteContent = () => {
    setAnswer(() => ({
      text: "",
      errorStatus: false,
      errorMessage: "",
    }));
  };

  // エラーのリセット
  useEffect(() => {
    setAnswer((answer) => ({
      ...answer,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [answer.text]);

  return (
    <>
      <MultilineTextField
        label="内容"
        value={answer.text}
        setValue={setAnswer}
        error={answer.errorStatus}
        errorMessage={answer.errorMessage}
        disabled={running}
      />
      <div style={{ textAlign: "right" }}>
        <Button
          color="primary"
          onClick={deleteContent}
          disabled={answer.text === "" || running}
        >
          内容を消去
        </Button>
      </div>
    </>
  );
};

export default AnswerTextField;
