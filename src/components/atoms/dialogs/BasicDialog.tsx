import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Linear from "../progress/Linear";

type Props = {
  title: string;
  open: boolean;
  onClick: () => void;
  content: JSX.Element;
  running: boolean;
};

const BasicDialog = (props: Props) => {
  return (
    <>
      <Dialog
        open={props.open}
        onClose={props.onClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={props.running} />
        <DialogTitle id="alert-dialog-title">
          <p style={{ textAlign: "center" }}>{props.title}</p>
        </DialogTitle>
        <DialogContent>{props.content}</DialogContent>
        <DialogActions>
          <Button
            onClick={props.onClick}
            color="primary"
            disabled={props.running}
          >
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BasicDialog;
