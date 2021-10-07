import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
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
