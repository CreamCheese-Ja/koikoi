import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import styles from "styles/components/atoms/progress/linear.module.css";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

type Props = {
  running: boolean;
};

const Linear = (props: Props) => {
  const classes = useStyles();

  return (
    <div className={props.running ? classes.root : styles.hideLinear}>
      <LinearProgress />
    </div>
  );
};

export default Linear;