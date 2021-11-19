import { Dispatch, memo, SetStateAction } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useSetRecoilState } from "recoil";
import { guestLoginDialogState, loginAndSignUpFormState } from "src/atoms/atom";

type Props = {
  authMenu: HTMLElement | null;
  setAuthMenu: Dispatch<SetStateAction<HTMLElement | null>>;
};

const AuthMenu = (props: Props) => {
  const { authMenu, setAuthMenu } = props;

  // 投稿メニュー閉
  const closeAuthMenu = () => {
    setAuthMenu(null);
  };

  const setLoginAndSignUpDialog = useSetRecoilState(loginAndSignUpFormState);
  const setGuestLoginDialog = useSetRecoilState(guestLoginDialogState);

  return (
    <div>
      <Menu
        id="simple-menu"
        anchorEl={authMenu}
        keepMounted
        open={Boolean(authMenu)}
        onClose={closeAuthMenu}
      >
        <MenuItem
          onClick={() =>
            setLoginAndSignUpDialog({ title: "ログイン", status: true })
          }
        >
          ログイン
        </MenuItem>
        <MenuItem
          onClick={() =>
            setLoginAndSignUpDialog({ title: "無料会員登録", status: true })
          }
        >
          無料会員登録
        </MenuItem>
        <MenuItem onClick={() => setGuestLoginDialog(true)}>
          ゲストログイン
        </MenuItem>
      </Menu>
    </div>
  );
};

export default memo(AuthMenu);
