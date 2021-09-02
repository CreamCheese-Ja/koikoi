import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  consultationContentState,
  consultationCategoryState,
  consultationErrorMessageState,
  consultationErrorState,
  consultationTitleState,
  createConsultationDialogState,
} from "src/atoms/atom";
import styles from "styles/components/atoms/dialogs/createConsultationDialog.module.css";
import PostExecutionButton from "../buttons/PostExecutionButton";
import ConsultationTitleField from "../textFields/ConsultationTitleField";
import ConsultationContentField from "../textFields/ConsultationContentField";
import ConsultationCategorySelect from "../selectBoxes/ConsultationCategorySelect";

const CreateConsultationDialog = () => {
  const [open, setOpen] = useRecoilState(createConsultationDialogState);

  const [category, setCategory] = useRecoilState(consultationCategoryState);
  const [title, setTitle] = useRecoilState(consultationTitleState);
  const [content, setContent] = useRecoilState(consultationContentState);

  const setInputError = useSetRecoilState(consultationErrorState);
  const setErrorMessage = useSetRecoilState(consultationErrorMessageState);

  const handleClose = () => {
    setOpen(false);
  };

  const postConsultation = () => {};

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <p className={styles.title}>恋愛相談</p>
        </DialogTitle>
        <DialogContent>
          <div className={styles.inputArea}>
            <ConsultationCategorySelect />
          </div>
          <div className={styles.inputArea}>
            <ConsultationTitleField />
          </div>
          <div className={styles.inputArea}>
            <ConsultationContentField />
          </div>
          <div className={styles.buttonArea}>
            <PostExecutionButton />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateConsultationDialog;
