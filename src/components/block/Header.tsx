import React from "react";
import HeaderNav from "../atoms/HeaderNav";
import styles from "styles/components/block/header.module.css";
import {
  createStyles,
  alpha,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import LoginAndSignUpForm from "./LoginAndSignUpForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: "white",
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "white",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

const Header = () => {
  const classes = useStyles();

  const [searchWord, setSearchWord] = React.useState("");
  const [composing, setComposing] = React.useState(false);

  return (
    <header className={styles.header}>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Title
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon color="secondary" />
              </div>
              <InputBase
                value={searchWord}
                onChange={(e) => {
                  setSearchWord(() => e.target.value);
                }}
                placeholder="検索…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onCompositionStart={() => {
                  setComposing(true);
                }}
                onCompositionEnd={() => {
                  setComposing(false);
                }}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    composing === false &&
                    searchWord !== ""
                  ) {
                    // エンターキー押下時の処理
                    // alert(searchWord);
                    e.currentTarget.blur();
                  }
                }}
              />
            </div>
            <HeaderNav />
            <LoginAndSignUpForm />
          </Toolbar>
        </AppBar>
      </div>
    </header>
  );
};

export default Header;
