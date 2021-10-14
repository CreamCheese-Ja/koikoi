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
  const { open, dialogClose, title, content, mainMethod, running } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={running} />
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose} color="primary" disabled={running}>
            いいえ
          </Button>
          <Button onClick={mainMethod} color="primary" disabled={running}>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BasicAlertDialog;
