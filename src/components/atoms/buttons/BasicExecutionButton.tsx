import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

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

const BasicExecutionButton = (props: Props) => {
  const classes = useStyles();
  return (
    <>
      <Button
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.buttonLabel}
      </Button>
    </>
  );
};

export default BasicExecutionButton;