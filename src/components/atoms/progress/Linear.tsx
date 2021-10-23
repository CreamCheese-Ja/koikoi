import React, { memo } from "react";
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

const Linear = memo((props: Props) => {
  const { running } = props;

  const classes = useStyles();

  return (
    <div className={running ? classes.root : styles.hideLinear}>
      <LinearProgress />
    </div>
  );
});

export default Linear;
