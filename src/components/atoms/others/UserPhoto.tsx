import { memo } from "react";
import Image from "next/image";
import defaultUserImage from "public/images/defaultUserImage.png";
import Link from "next/link";
import styles from "styles/components/atoms/others/userPhoto.module.css";

type Props = {
  photoURL: string;
  width: number;
  height: number;
  userId?: string;
};

const defaultImage = (width: number, height: number) => {
  return (
    <Image
      src={defaultUserImage}
      width={width}
      height={height}
      alt="userPhoto"
      className={styles.image}
    />
  );
};

const userImage = (photoURL: string, width: number, height: number) => {
  return (
    <Image
      src={photoURL}
      width={width}
      height={height}
      alt="userPhoto"
      className={styles.image}
    />
  );
};

const UserPhoto = (props: Props) => {
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
};

export default memo(UserPhoto);
