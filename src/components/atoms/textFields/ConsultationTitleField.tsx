import React, { useEffect } from "react";
import MultilineTextField from "./MultilineTextField";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  consultationTitleState,
  postConsultationRunning,
} from "src/atoms/atom";

const ConsultationTitleField = () => {
  const [title, setTitle] = useRecoilState(consultationTitleState);

  // 実行中の値
  const running = useRecoilValue(postConsultationRunning);

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
        disabled={running}
      />
    </>
  );
};

export default ConsultationTitleField;
