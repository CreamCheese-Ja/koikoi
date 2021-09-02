import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  consultationCategoryState,
  consultationErrorMessageState,
  consultationErrorState,
} from "src/atoms/atom";
import CategorySelect from "./CategorySelect";

const ConsultationCategorySelect = () => {
  const [category, setCategory] = useRecoilState(consultationCategoryState);
  const inputError = useRecoilValue(consultationErrorState);
  const errorMessage = useRecoilValue(consultationErrorMessageState);

  return (
    <div>
      <CategorySelect
        value={category}
        setValue={setCategory}
        error={inputError.category}
        errorMessage={errorMessage.category}
      />
    </div>
  );
};

export default ConsultationCategorySelect;
