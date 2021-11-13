import HeaderNav from "./nav/HeaderNav";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginAndSignUpFormState, userProfileState } from "src/atoms/atom";
import PostMenu from "../modules/menu/PostMenu";
import Button from "@material-ui/core/Button";

import DrawerMenu from "../modules/others/DrawerMenu";
import useMedia from "use-media";
import { useCallback, useState } from "react";
import AppLogo from "../atoms/others/AppLogo";
import PageLoading from "../atoms/progress/PageLoading";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const classes = useStyles();
  const isWide = useMedia({ minWidth: 961 });

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  // 投稿メニュー用state
  const [postMenu, setPostMenu] = useState<null | HTMLElement>(null);
  // 投稿メニュー開
  const openPostMenu = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setPostMenu(event.currentTarget);
    },
    [postMenu]
  );

  const headerAreaStyle: { [key: string]: string | number } = {
    position: "fixed",
    width: "100%",
    zIndex: 3,
  };

  const buttonAreaStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <header style={headerAreaStyle}>
      <PageLoading />
      <AppBar position="static">
        <Toolbar>
          <div className={classes.title}>
            <AppLogo />
          </div>
          {/* <SearchBar /> */}
          <HeaderNav />
          {userProfile.name === "" ? (
            <div>
              <Button
                color="secondary"
                onClick={() => {
                  setLoginAndSignUpForm({ title: "ログイン", status: true });
                }}
              >
                ログイン
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setLoginAndSignUpForm({
                    title: "無料会員登録",
                    status: true,
                  });
                }}
              >
                無料会員登録
              </Button>
            </div>
          ) : (
            <div style={buttonAreaStyle}>
              {isWide ? (
                <>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={openPostMenu}
                  >
                    投稿する
                  </Button>
                  <PostMenu postMenu={postMenu} setPostMenu={setPostMenu} />
                </>
              ) : (
                <></>
              )}
              <DrawerMenu />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
