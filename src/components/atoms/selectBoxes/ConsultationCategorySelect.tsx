import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { consultationCategoryState } from "src/atoms/atom";
import CategorySelect from "./CategorySelect";

const ConsultationCategorySelect = () => {
  const [category, setCategory] = useRecoilState(consultationCategoryState);

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
      />
    </>
  );
};

export default ConsultationCategorySelect;
