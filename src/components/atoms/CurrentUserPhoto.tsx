import React from "react";
import Image from "next/image";
import Button from "@material-ui/core/Button";
import noProfile from "public/images/no-profile.png";
import { useRecoilValue, useRecoilState } from "recoil";
import { userMenuState, userProfileState } from "src/atoms/atom";
import UserMenu from "./UserMenu";

const CurrentUserPhoto = () => {
  const userProfile = useRecoilValue(userProfileState);

  const [userMenu, setUserMenu] = useRecoilState(userMenuState);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setUserMenu(event.currentTarget);
  };

  return (
    <div>
      {userProfile.photoURL === "noImage" ? (
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Image src={noProfile} width={40} height={40} />
        </Button>
      ) : (
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Image src={noProfile} width={40} height={40} />
        </Button>
      )}
      <UserMenu />
    </div>
  );
};

export default CurrentUserPhoto;
