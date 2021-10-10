import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { tweetCategoryState } from "src/atoms/atom";
import CategorySelect from "./CategorySelect";

type Props = {
  running: boolean;
};

const TweetCategorySelect = (props: Props) => {
  const { running } = props;
  const [category, setCategory] = useRecoilState(tweetCategoryState);

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

export default TweetCategorySelect;
