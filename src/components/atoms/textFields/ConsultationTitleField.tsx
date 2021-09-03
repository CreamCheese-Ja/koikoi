import React, { useEffect } from "react";
import MultilineTextField from "./MultilineTextField";
import { useRecoilState } from "recoil";
import { consultationTitleState } from "src/atoms/atom";

const ConsultationTitleField = () => {
  const [title, setTitle] = useRecoilState(consultationTitleState);

  useEffect(() => {
    setTitle((title) => ({
      ...title,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [title.text]);

  return (
    <>
      <MultilineTextField
        label="タイトル"
        value={title.text}
        setValue={setTitle}
        error={title.errorStatus}
        errorMessage={title.errorMessage}
      />
    </>
  );
};

export default ConsultationTitleField;
