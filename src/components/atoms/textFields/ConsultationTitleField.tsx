import React from "react";
import MultilineTextField from "./MultilineTextField";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  consultationTitleState,
  consultationErrorMessageState,
  consultationErrorState,
} from "src/atoms/atom";

const ConsultationTitleField = () => {
  const [title, setTitle] = useRecoilState(consultationTitleState);
  const inputError = useRecoilValue(consultationErrorState);
  const errorMessage = useRecoilValue(consultationErrorMessageState);

  return (
    <>
      <MultilineTextField
        label="タイトル"
        value={title}
        setValue={setTitle}
        error={inputError.title}
        errorMessage={errorMessage.title}
      />
    </>
  );
};

export default ConsultationTitleField;
