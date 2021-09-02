import React from "react";
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
  fetchNextPage: () => void;
};

const PostExecutionButton = () => {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" color="primary" className={classes.root}>
        投稿する
      </Button>
    </div>
  );
};

export default PostExecutionButton;
