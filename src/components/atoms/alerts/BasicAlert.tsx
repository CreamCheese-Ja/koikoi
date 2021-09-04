import React, { Dispatch, SetStateAction } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type Props = {
  alert: boolean;
  setAlert: Dispatch<SetStateAction<boolean>>;
  message: string;
  warningType: Color;
};

// 消す予定、使わない(Alertsと新規登録フォームで使用中)
const BasicAlert = (props: Props) => {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    props.setAlert(false);
  };

  return (
    <Snackbar open={props.alert} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={props.warningType}>{props.message}</Alert>
    </Snackbar>
  );
};

export default BasicAlert;
