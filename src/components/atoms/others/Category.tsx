import React, { memo } from "react";
import styles from "styles/components/atoms/others/category.module.css";

type Props = {
  categoryLabel: string;
};

const Category = memo((props: Props) => {
  let style = null;
  switch (props.categoryLabel) {
    case "出会い":
      style = { backgroundColor: "#ffb74d" };
      break;
    case "片想い":
      style = { backgroundColor: "#81c784" };
      break;
    case "恋人未満":
      style = { backgroundColor: "#ff8a65" };
      break;
    case "恋人":
      style = { backgroundColor: "#f06292" };
      break;
    case "復縁":
      style = { backgroundColor: "#4db6ac" };
      break;
    case "結婚":
      style = { backgroundColor: "#e57373" };
      break;
    case "浮気":
      style = { backgroundColor: "#64b5f6" };
      break;
    case "不倫":
      style = { backgroundColor: "#ba68c8" };
      break;
    case "その他":
      style = { backgroundColor: "#a1887f" };
      break;
    default:
      style = { backgroundColor: "#fff" };
      break;
  }
  return (
    <div {...{ style }} className={styles.category}>
      {props.categoryLabel}
    </div>
  );
});

export default Category;
