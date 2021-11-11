import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { memo } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& > *": {
        padding: "7px 70px",
        color: "white",
      },
    },
  })
);

type Props = {
  onClick: () => void;
  buttonLabel: string;
  disabled: boolean;
};

const ExecutionButton = (props: Props) => {
  const { onClick, buttonLabel, disabled } = props;

  const classes = useStyles();
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={onClick}
        disabled={disabled}
      >
        {buttonLabel}
      </Button>
    </>
  );
};

export default memo(ExecutionButton);
