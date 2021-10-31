import { MouseEvent, useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const ResponsiveUserMenu = () => {
  // ユーザーメニュー用のstate
  const [showMenu, setShowMenu] = useState<null | HTMLElement>(null);

  // ユーザーメニュー開閉
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setShowMenu(event.currentTarget);
  };

  const handleClose = () => {
    setShowMenu(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={openMenu}
      >
        <MenuIcon color="secondary" />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={showMenu}
        keepMounted
        open={Boolean(showMenu)}
        onClose={handleClose}
      >
        <MenuItem>無料会員登録</MenuItem>
        <MenuItem>ログイン</MenuItem>
      </Menu>
    </div>
  );
};

export default ResponsiveUserMenu;
