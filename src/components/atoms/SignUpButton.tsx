import React from "react";
import Button from "@material-ui/core/Button";

type Props = {
  handleClickOpen: () => void;
};

const SignUpButton = (props: Props) => {
  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={props.handleClickOpen}
      >
        無料会員登録
      </Button>
    </>
  );
};

export default SignUpButton;
