import React, { useState } from "react";
import CreateAnswerDialog from "../../modules/dialogs/CreateAnswerDialog";
import BasicExecutionButton from "./BasicExecutionButton";

type Props = {
  consultationId: string;
};

const AnswerButton = (props: Props) => {
  const [open, setOpen] = useState(false);

  const openCloseDialog = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <BasicExecutionButton
        onClick={openCloseDialog}
        buttonLabel="相談に回答"
        disabled={false}
      />
      <CreateAnswerDialog
        open={open}
        openCloseDialog={openCloseDialog}
        consultationId={props.consultationId}
      />
    </>
  );
};

export default AnswerButton;
