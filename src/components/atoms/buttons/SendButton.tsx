import React, { Dispatch, SetStateAction } from "react";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

type Props = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onClick: () => void;
  running: boolean;
};

const SendButton = (props: Props) => {
  return (
    <IconButton
      disabled={props.value === "" || props.running}
      style={{ marginBottom: "25px", marginRight: "-10px" }}
      onClick={props.onClick}
    >
      <SendIcon color={props.value === "" ? "disabled" : "primary"} />
    </IconButton>
  );
};

export default SendButton;
