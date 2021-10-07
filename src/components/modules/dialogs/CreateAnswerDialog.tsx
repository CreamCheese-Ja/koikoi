import React from "react";
import { useRecoilValue } from "recoil";
import { postAnswerRunningState } from "src/atoms/atom";
import PostAnswerButton from "../../atoms/buttons/PostAnswerButton";
import AnswerTextField from "../../atoms/textFields/AnswerTextField";
import BasicDialog from "./BasicDialog";

type Props = {
  open: boolean;
  consultationId: string;
  openCloseDialog: () => void;
};

const CreateAnswerDialog = (props: Props) => {
  const running = useRecoilValue(postAnswerRunningState);

  return (
    <>
      <BasicDialog
        title="回答"
        open={props.open}
        onClick={props.openCloseDialog}
        content={
          <div>
            <div style={{ marginBottom: "10px" }}>
              <AnswerTextField running={running} />
            </div>
            <div style={{ textAlign: "center" }}>
              <PostAnswerButton
                consultationId={props.consultationId}
                openCloseDialog={props.openCloseDialog}
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
