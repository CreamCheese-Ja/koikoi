import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useRecoilState } from "recoil";
import {
  consultationContentState,
  consultationCategoryState,
  consultationTitleState,
} from "src/atoms/atom";

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

const PostExecutionButton = () => {
  const classes = useStyles();

  const [category, setCategory] = useRecoilState(consultationCategoryState);
  const [title, setTitle] = useRecoilState(consultationTitleState);
  const [content, setContent] = useRecoilState(consultationContentState);

  // 投稿ボタンを押下した時に動く関数
  const postConsultation = async () => {
    if (category.text !== "" && title.text !== "" && content.text !== "") {
    } else {
      if (category.text === "") {
        setCategory((category) => ({
          ...category,
          errorStatus: true,
          errorMessage: "カテゴリーを選択してください。",
        }));
      }
      if (title.text === "") {
        setTitle((title) => ({
          ...title,
          errorStatus: true,
          errorMessage: "タイトルを入力してください。",
        }));
      }
      if (content.text === "") {
        setContent((content) => ({
          ...content,
          errorStatus: true,
          errorMessage: "内容を入力してください。",
        }));
      }
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={postConsultation}
      >
        投稿する
      </Button>
    </div>
  );
};

export default PostExecutionButton;
