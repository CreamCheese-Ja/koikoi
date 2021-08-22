import React from "react";
import HeaderNav from "../atoms/HeaderNav";
import styles from "styles/components/block/header.module.css";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import LoginAndSignUpButton from "../atoms/LoginAndSignUpButton";
import SearchBar from "../atoms/SearchBar";
import { useRecoilValue } from "recoil";
import { userProfileState } from "src/atoms/atom";
import CurrentUserPhoto from "../atoms/CurrentUserPhoto";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      color: "white",
    },
  })
);

const Header = () => {
  const classes = useStyles();

  const userProfile = useRecoilValue(userProfileState);

  return (
    <header className={styles.header}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Title
            </Typography>
            <SearchBar />
            <HeaderNav />
            {userProfile.name === "" ? (
              <LoginAndSignUpButton />
            ) : (
              <CurrentUserPhoto />
            )}
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
};

export default Header;
