import React, { Dispatch, memo, SetStateAction } from "react";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onClick: () => void;
  running: boolean;
};

const SendButton = memo((props: Props) => {
  const { value, setValue, onClick, running } = props;

  return (
    <IconButton
      disabled={value === "" || running}
      style={{ marginBottom: "25px", marginRight: "-10px" }}
      onClick={onClick}
    >
      <SendIcon color={value === "" ? "disabled" : "primary"} />
    </IconButton>
  );
});

export default SendButton;
