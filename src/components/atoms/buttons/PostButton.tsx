import React from "react";
import Button from "@material-ui/core/Button";
import PostMenu from "../PostMenu";
import { useSetRecoilState } from "recoil";
import { postMenuState } from "src/atoms/atom";

const PostButton = () => {
  const setPostMenu = useSetRecoilState(postMenuState);

  const openPostMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPostMenu(event.currentTarget);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={openPostMenu}>
        投稿する
      </Button>
      <PostMenu />
    </div>
  );
};

export default PostButton;
