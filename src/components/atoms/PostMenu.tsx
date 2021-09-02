import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  createConsultationDialogState,
  createTweetDialogState,
  postMenuState,
} from "src/atoms/atom";

const PostMenu = () => {
  const [postMenu, setPostMenu] = useRecoilState(postMenuState);
  const setCreateConsultationDialog = useSetRecoilState(
    createConsultationDialogState
  );
  const setCreateTweetDialog = useSetRecoilState(createTweetDialogState);

  const handleClose = () => {
    setPostMenu(null);
  };
  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={postMenu}
        keepMounted
        open={Boolean(postMenu)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => setCreateConsultationDialog(true)}>
          恋愛相談
        </MenuItem>
        <MenuItem onClick={() => setCreateTweetDialog(true)}>つぶやき</MenuItem>
      </Menu>
    </div>
  );
};

export default PostMenu;
