import { Button } from "@material-ui/core";
import React, { memo } from "react";

type Props = {
  isShowField: boolean;
  onClick: () => void;
  trueWord: string;
  falseWord: string;
};

const ShowTextFieldButton = memo((props: Props) => {
  const { isShowField, onClick, trueWord, falseWord } = props;

  return (
    <>
      <Button color="primary" onClick={onClick}>
        {isShowField ? trueWord : falseWord}
      </Button>
    </>
  );
});

export default ShowTextFieldButton;
