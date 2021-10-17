import React, { memo } from "react";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import Link from "next/link";

type Props = {
  photoURL: string;
  width: number;
  height: number;
  userId?: string;
};

const defaultImage = (width: number, height: number) => {
  return (
    <Image src={noProfile} width={width} height={height} alt="userPhoto" />
  );
};

const userImage = (photoURL: string, width: number, height: number) => {
  return <Image src={photoURL} width={width} height={height} alt="userPhoto" />;
};

const UserPhoto = memo((props: Props) => {
  const { photoURL, width, height, userId } = props;

  return (
    <>
      {userId ? (
        <Link href={`/users/${userId}`}>
          <a>
            {photoURL === "noImage"
              ? defaultImage(width, height)
              : userImage(photoURL, width, height)}
          </a>
        </Link>
      ) : (
        <>
          {photoURL === "noImage"
            ? defaultImage(width, height)
            : userImage(photoURL, width, height)}
        </>
      )}
    </>
  );
});

export default UserPhoto;
