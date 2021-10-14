import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { authCheckState } from "src/atoms/atom";
import CreateAnswerDialog from "../../modules/dialogs/CreateAnswerDialog";
import BasicExecutionButton from "./BasicExecutionButton";

type Props = {
  consultationId: string;
};

const AnswerButton = (props: Props) => {
  const { consultationId } = props;

  const [open, setOpen] = useState(false);

  const openCloseDialog = () => {
    setOpen((open) => !open);
  };
  // 認証チェックのstate値
  const isAuthCheck = useRecoilValue(authCheckState);

  return (
    <>
      {isAuthCheck ? (
        <BasicExecutionButton
          onClick={openCloseDialog}
          buttonLabel="相談に回答"
          disabled={false}
        />
      ) : (
        <div></div>
      )}
      <CreateAnswerDialog
        open={open}
        openCloseDialog={openCloseDialog}
        consultationId={consultationId}
      />
    </>
  );
};

export default AnswerButton;
