import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";
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
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    props.setAlert({ status: false, message: "" });
  };

  return (
    <Snackbar open={props.alert} autoHideDuration={6000} onClose={handleClose}>
      <Alert severity={props.warningType}>{props.message}</Alert>
    </Snackbar>
  );
};

export default MultipurposeAlert;
