import { ReactNode } from "react";
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
  running: boolean;
  hasCancel: boolean;
  isLock: boolean;
  children: ReactNode;
};

const AppDialogWindow = ({ children, ...props }: Props) => {
  const { title, open, onClick, running, hasCancel, isLock } = props;
  return (
    <>
      <Dialog
        open={open}
        onClose={running || isLock ? () => {} : onClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={running} />
        <DialogTitle id="alert-dialog-title">
          <p style={{ textAlign: "center" }}>{title}</p>
        </DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {hasCancel ? (
            <Button onClick={onClick} color="primary" disabled={running}>
              キャンセル
            </Button>
          ) : (
            <></>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppDialogWindow;
