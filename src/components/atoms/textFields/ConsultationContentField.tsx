import React, { useEffect } from "react";
import MultilineTextField from "./MultilineTextField";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  consultationContentState,
  postConsultationRunning,
} from "src/atoms/atom";

const ConsultationContentField = () => {
  const [content, setContent] = useRecoilState(consultationContentState);

  // 実行中の値
  const running = useRecoilValue(postConsultationRunning);

  useEffect(() => {
    setContent((content) => ({
      ...content,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [content.text]);

  return (
    <>
      <MultilineTextField
        label="内容"
        value={content.text}
        setValue={setContent}
        error={content.errorStatus}
        errorMessage={content.errorMessage}
        disabled={running}
      />
    </>
  );
};

export default ConsultationContentField;
