import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";
import Linear from "src/components/atoms/progress/Linear";

type Props = {
  open: boolean;
  dialogClose: () => void;
  title: string;
  content: string;
  mainMethod: () => void;
  running: boolean;
};

const BasicAlertDialog = (props: Props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={props.running} />
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={props.dialogClose}
            color="primary"
            disabled={props.running}
          >
            いいえ
          </Button>
          <Button
            onClick={props.mainMethod}
            color="primary"
            disabled={props.running}
          >
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BasicAlertDialog;
