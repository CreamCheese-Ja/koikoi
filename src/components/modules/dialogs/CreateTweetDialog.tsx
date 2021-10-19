import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRecoilState } from "recoil";
import { createTweetDialogState } from "src/atoms/atom";
import Linear from "src/components/atoms/progress/Linear";
import styles from "styles/components/modules/dialogs/createConsulAndTweetDialog.module.css";
import PostTweetButton from "../buttons/PostTweetButton";
import SelectBox from "src/components/atoms/input/SelectBox";
import { categoryItem } from "src/common/selectItems";
import MultilineTextField from "src/components/atoms/textFields/MultilineTextField";

const CreateTweetDialog = () => {
  const [open, setOpen] = useRecoilState(createTweetDialogState);
  const [running, setRunning] = useState(false);

  const [category, setCategory] = useState({
    text: "",
    errorStatus: false,
    errorMessage: "",
  });

  const [content, setContent] = useState({
    text: "",
    errorStatus: false,
    errorMessage: "",
  });

  useEffect(() => {
    setCategory((category) => ({
      ...category,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [category.text]);

  useEffect(() => {
    setContent((content) => ({
      ...content,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [content.text]);

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
            <SelectBox
              value={category.text}
              setValue={setCategory}
              error={category.errorStatus}
              errorMessage={category.errorMessage}
              disabled={running}
              selectLabel="カテゴリー"
              selectItem={categoryItem}
            />
          </div>
          <div className={styles.inputArea}>
            <MultilineTextField
              label="内容"
              value={content.text}
              setValue={setContent}
              error={content.errorStatus}
              errorMessage={content.errorMessage}
              disabled={running}
            />
          </div>
          <div className={styles.buttonArea}>
            <PostTweetButton
              handleClose={handleClose}
              running={running}
              setRunning={setRunning}
              category={category}
              content={content}
              setCategory={setCategory}
              setContent={setContent}
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
