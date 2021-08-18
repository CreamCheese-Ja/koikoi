import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import styles from "styles/components/atoms/executionButton.module.css";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      "& > *": {
        padding: "7px 105px",

        color: "white",
      },
    },
  })
);
type Props = {
  name: string;
};

const ExecutionButton = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={styles.buttonArea}>
      <Button variant="contained" color="primary" className={classes.root}>
        {props.name}
      </Button>
    </div>
  );
};

export default ExecutionButton;
