import HeaderNav from "./nav/HeaderNav";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loginAndSignUpFormState, userProfileState } from "src/atoms/atom";
import PostMenu from "../modules/menu/PostMenu";
import Button from "@material-ui/core/Button";
import logo from "public/images/koikoiLogo.png";
import Image from "next/image";
import DrawerMenu from "../modules/others/DrawerMenu";

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  })
);

const Header = () => {
  const classes = useStyles();

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

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
      <AppBar position="static">
        <Toolbar>
          <div className={classes.title}>
            <Image src={logo} width={102} height={44}></Image>
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
              <PostMenu />
              <DrawerMenu />
            </div>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
