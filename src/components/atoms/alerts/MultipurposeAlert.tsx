import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";
import { SyntheticEvent } from "react";
import { SetterOrUpdater } from "recoil";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

type Props = {
  alert: boolean;
  setAlert: SetterOrUpdater<{ status: boolean; message: string }>;
  message: string;
  warningType: Color;
};

const MultipurposeAlert = (props: Props) => {
  const { alert, setAlert, message, warningType } = props;

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert({ status: false, message: "" });
  };

  return (
    <Snackbar open={alert} autoHideDuration={4000} onClose={handleClose}>
      <Alert severity={warningType}>{message}</Alert>
    </Snackbar>
  );
};

export default MultipurposeAlert;
