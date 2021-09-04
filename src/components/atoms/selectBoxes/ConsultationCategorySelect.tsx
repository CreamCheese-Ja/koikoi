import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  consultationCategoryState,
  postConsultationRunning,
} from "src/atoms/atom";
import CategorySelect from "./CategorySelect";

const ConsultationCategorySelect = () => {
  const [category, setCategory] = useRecoilState(consultationCategoryState);

  // 実行中の値
  const running = useRecoilValue(postConsultationRunning);

  useEffect(() => {
    setCategory((category) => ({
      ...category,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [category.text]);

  return (
    <>
      <CategorySelect
        value={category.text}
        setValue={setCategory}
        error={category.errorStatus}
        errorMessage={category.errorMessage}
        disabled={running}
      />
    </>
  );
};

export default ConsultationCategorySelect;
