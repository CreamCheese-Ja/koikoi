import React from "react";
import { useRecoilValue } from "recoil";
import { postAnswerRunningState } from "src/atoms/atom";
import PostAnswerButton from "../buttons/PostAnswerButton";
import AnswerTextField from "../textFields/AnswerTextField";
import BasicDialog from "./BasicDialog";

type Props = {
  open: boolean;
  consultationId: string;
  openCloseDialog: () => void;
};

const CreateAnswerDialog = (props: Props) => {
  const { open, consultationId, openCloseDialog } = props;

  const running = useRecoilValue(postAnswerRunningState);

  return (
    <>
      <BasicDialog
        title="回答"
        open={open}
        onClick={openCloseDialog}
        content={
          <div>
            <div style={{ marginBottom: "10px" }}>
              <AnswerTextField running={running} />
            </div>
            <div style={{ textAlign: "center" }}>
              <PostAnswerButton
                consultationId={consultationId}
                openCloseDialog={openCloseDialog}
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
