import React, { Dispatch, SetStateAction } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type Props = {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
  message: string;
  warningType: Color;
};

const AlertMessage = (props: Props) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    props.setError(false);
  };

  return (
    <Snackbar open={props.error} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={props.warningType}>{props.message}</Alert>
    </Snackbar>
  );
};

export default AlertMessage;
