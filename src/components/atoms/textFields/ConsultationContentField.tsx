import React, { useEffect } from "react";
import MultilineTextField from "./MultilineTextField";
import { useRecoilState } from "recoil";
import { consultationContentState } from "src/atoms/atom";

const ConsultationContentField = () => {
  const [content, setContent] = useRecoilState(consultationContentState);

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
      />
    </>
  );
};

export default ConsultationContentField;
