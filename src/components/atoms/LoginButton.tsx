import React from "react";
import Button from "@material-ui/core/Button";

type Props = {
  handleClickOpen: () => void;
};

const LoginButton = (props: Props) => {
  return (
    <>
      <Button color="secondary" onClick={props.handleClickOpen}>
        ログイン
      </Button>
    </>
  );
};

export default LoginButton;
