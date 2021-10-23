import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSetRecoilState } from "recoil";
import {
  createConsultationDialogState,
  createTweetDialogState,
} from "src/atoms/atom";
import Button from "@material-ui/core/Button";
import CreateConsultationDialog from "../dialogs/CreateConsultationDialog";
import CreateTweetDialog from "../dialogs/CreateTweetDialog";

const PostMenu = () => {
  const [postMenu, setPostMenu] = useState<null | HTMLElement>(null);
  const setCreateConsultationDialog = useSetRecoilState(
    createConsultationDialogState
  );

  const openPostMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setPostMenu(event.currentTarget);
  };

  const setCreateTweetDialog = useSetRecoilState(createTweetDialogState);

  const handleClose = () => {
    setPostMenu(null);
  };
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={openPostMenu}>
        投稿する
      </Button>
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
        <CreateConsultationDialog setPostMenu={setPostMenu} />
        <MenuItem onClick={() => setCreateTweetDialog(true)}>つぶやき</MenuItem>
        <CreateTweetDialog setPostMenu={setPostMenu} />
      </Menu>
    </div>
  );
};

export default PostMenu;
