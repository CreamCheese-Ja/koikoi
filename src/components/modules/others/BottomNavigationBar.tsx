import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import SmsIcon from "@material-ui/icons/Sms";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import useMedia from "use-media";
import { useRecoilState, useRecoilValue } from "recoil";
import { pageNumberState, userProfileState } from "src/atoms/atom";
import Router from "next/router";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    borderTop: "0.1px solid #9e9e9e",
  },
});

const BottomNavigationBar = () => {
  const isWide = useMedia({ minWidth: 961 });
  const classes = useStyles();
  // globalでstateを持たせてページのuseEffectで同期する
  const [value, setValue] = useRecoilState(pageNumberState);

  const userProfile = useRecoilValue(userProfileState);

  const pagePush = (path: string) => {
    Router.push(path);
  };

  const navItem = [
    {
      label: "恋愛相談",
      icon: <LibraryBooksIcon />,
      onClick: () => pagePush("/consultations"),
    },
    {
      label: "つぶやき",
      icon: <SmsIcon />,
      onClick: () => pagePush("/tweets"),
    },
  ];

  const signedInNavItem = [
    ...navItem,
    {
      label: "マイページ",
      icon: <AccountCircleIcon />,
      onClick: () => pagePush(`/users/${userProfile.id}`),
    },
  ];

  return (
    <>
      {isWide ? (
        <></>
      ) : (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          {userProfile.id === "noUser"
            ? navItem.map((item) => (
                <BottomNavigationAction
                  label={item.label}
                  icon={item.icon}
                  onClick={item.onClick}
                  key={item.label}
                />
              ))
            : signedInNavItem.map((item) => (
                <BottomNavigationAction
                  label={item.label}
                  icon={item.icon}
                  onClick={item.onClick}
                  key={item.label}
                />
              ))}
        </BottomNavigation>
      )}
    </>
  );
};

export default BottomNavigationBar;
