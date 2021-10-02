import { Button } from "@material-ui/core";
import React from "react";
import { useRecoilState } from "recoil";
import { showAnswerReplyFieldState } from "src/atoms/atom";

const AnswerReplyButton = () => {
  const [showAnswerReplyField, setShowAnswerReplyField] = useRecoilState(
    showAnswerReplyFieldState
  );

  return (
    <div>
      <Button
        color="primary"
        onClick={() => setShowAnswerReplyField(!showAnswerReplyField)}
      >
        {showAnswerReplyField ? "入力欄を閉じる" : "返信する"}
      </Button>
    </div>
  );
};

export default AnswerReplyButton;
