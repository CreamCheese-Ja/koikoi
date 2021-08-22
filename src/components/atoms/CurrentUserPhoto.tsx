import React from "react";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import { useRecoilValue } from "recoil";
import { userProfileState } from "src/atoms/atom";

const CurrentUserPhoto = () => {
  const userProfile = useRecoilValue(userProfileState);

  return (
    <div>
      {userProfile.photoURL === "noImage" ? (
        <Image src={noProfile} width={40} height={40} />
      ) : (
        <Image src={noProfile} width={40} height={40} />
      )}
    </div>
  );
};

export default CurrentUserPhoto;
