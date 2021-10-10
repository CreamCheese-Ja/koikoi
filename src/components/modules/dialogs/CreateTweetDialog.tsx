import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRecoilState } from "recoil";
import { createTweetDialogState } from "src/atoms/atom";
import Linear from "src/components/atoms/progress/Linear";
import TweetCategorySelect from "src/components/atoms/selectBoxes/TweetCategorySelect";
import styles from "styles/components/modules/dialogs/createConsulAndTweetDialog.module.css";
import TweetContentField from "../textFields/TweetContentField";
import PostTweetButton from "../buttons/PostTweetButton";

const CreateTweetDialog = () => {
  const [open, setOpen] = useRecoilState(createTweetDialogState);

  const [running, setRunning] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Linear running={running} />
        <DialogTitle id="alert-dialog-title">
          <p className={styles.title}>つぶやき</p>
        </DialogTitle>
        <DialogContent>
          <div className={styles.inputArea}>
            <TweetCategorySelect running={running} />
          </div>
          <div className={styles.inputArea}>
            <TweetContentField running={running} />
          </div>
          <div className={styles.buttonArea}>
            <PostTweetButton
              handleClose={handleClose}
              running={running}
              setRunning={setRunning}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={running}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateTweetDialog;
