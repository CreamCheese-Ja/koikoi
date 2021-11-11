import { Dispatch, memo, SetStateAction } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSetRecoilState } from "recoil";
import {
  createConsultationDialogState,
  createTweetDialogState,
} from "src/atoms/atom";
import CreateConsultationDialog from "../dialogs/CreateConsultationDialog";
import CreateTweetDialog from "../dialogs/CreateTweetDialog";

type Props = {
  postMenu: HTMLElement | null;
  setPostMenu: Dispatch<SetStateAction<HTMLElement | null>>;
};

const PostMenu = (props: Props) => {
  const { postMenu, setPostMenu } = props;

  const setCreateConsultationDialog = useSetRecoilState(
    createConsultationDialogState
  );
  const setCreateTweetDialog = useSetRecoilState(createTweetDialogState);

  // 投稿メニュー閉
  const closePostMenu = () => {
    setPostMenu(null);
  };

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={postMenu}
        keepMounted
        open={Boolean(postMenu)}
        onClose={closePostMenu}
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

export default memo(PostMenu);
