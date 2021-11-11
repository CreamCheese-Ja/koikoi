import Button from "@material-ui/core/Button";
import { memo } from "react";

type Props = {
  onClick: () => void;
  buttonLabel: string;
  variant: "text" | "outlined" | "contained";
};

const BasicButton = (props: Props) => {
  const { onClick, buttonLabel, variant } = props;
  return (
    <>
      <Button variant={variant} color="primary" onClick={onClick}>
        {buttonLabel}
      </Button>
    </>
  );
};

export default memo(BasicButton);
