import React from "react";
import MultilineTextField from "./MultilineTextField";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  consultationContentState,
  consultationErrorMessageState,
  consultationErrorState,
} from "src/atoms/atom";

const ConsultationContentField = () => {
  const [content, setContent] = useRecoilState(consultationContentState);
  const inputError = useRecoilValue(consultationErrorState);
  const errorMessage = useRecoilValue(consultationErrorMessageState);

  return (
    <>
      <MultilineTextField
        label="内容"
        value={content}
        setValue={setContent}
        error={inputError.content}
        errorMessage={errorMessage.content}
      />
    </>
  );
};

export default ConsultationContentField;
