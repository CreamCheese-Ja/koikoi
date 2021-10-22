import React, { memo } from "react";
import Image from "next/image";
import IconButton from "@material-ui/core/IconButton";
import noProfile from "public/images/no-profile.png";
import { useRecoilValue, useRecoilState } from "recoil";
import { userMenuState, userProfileState } from "src/atoms/atom";
import UserMenu from "../../modules/menu/UserMenu";
import styles from "styles/components/atoms/others/userPhoto.module.css";

const CurrentUserPhoto = memo(() => {
  const userProfile = useRecoilValue(userProfileState);

  const [userMenu, setUserMenu] = useRecoilState(userMenuState);

  const openUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenu(event.currentTarget);
  };

  return (
    <div>
      {userProfile.photoURL === "noImage" ? (
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openUserMenu}
          style={{ borderRadius: "50%", overflow: "hidden" }}
        >
          <Image src={noProfile} width={40} height={40} alt="userPhoto" />
        </IconButton>
      ) : (
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openUserMenu}
        >
          <Image
            src={userProfile.photoURL}
            width={40}
            height={40}
            alt="userPhoto"
            className={styles.image}
          />
        </IconButton>
      )}
      <UserMenu />
    </div>
  );
});

export default CurrentUserPhoto;
