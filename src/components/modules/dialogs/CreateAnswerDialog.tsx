import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { postAnswerRunningState } from "src/atoms/atom";
import PostAnswerButton from "../buttons/PostAnswerButton";
import Button from "@material-ui/core/Button";
import BasicDialog from "../../atoms/dialogs/BasicDialog";
import MultilineTextField from "src/components/atoms/input/MultilineTextField";

type Props = {
  open: boolean;
  consultationId: string;
  openCloseDialog: () => void;
};

const CreateAnswerDialog = (props: Props) => {
  const { open, consultationId, openCloseDialog } = props;

  const [answer, setAnswer] = useState({
    text: "",
    errorStatus: false,
    errorMessage: "",
  });

  const running = useRecoilValue(postAnswerRunningState);

  // エラーのリセット
  useEffect(() => {
    setAnswer((answer) => ({
      ...answer,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [answer.text]);

  // 内容の消去
  const deleteContent = () => {
    setAnswer(() => ({
      text: "",
      errorStatus: false,
      errorMessage: "",
    }));
  };

  return (
    <>
      <BasicDialog
        title="回答"
        open={open}
        onClick={openCloseDialog}
        content={
          <div>
            <div style={{ marginBottom: "10px" }}>
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
            </div>
            <div style={{ textAlign: "center" }}>
              <PostAnswerButton
                consultationId={consultationId}
                openCloseDialog={openCloseDialog}
                answer={answer}
                setAnswer={setAnswer}
              />
            </div>
          </div>
        }
        running={running}
      />
    </>
  );
};

export default CreateAnswerDialog;
