import React from "react";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Divider from "@material-ui/core/Divider";
import styles from "styles/components/atoms/consultationArea.module.css";

const ConsultationArea = () => {
  return (
    <div>
      <div className={styles.consultationArea}>
        <div className={styles.consultationTop}>
          <div className={styles.userArea}>
            <Image src={noProfile} width={30} height={30} />
            <div className={styles.userName}>userName</div>
          </div>
          <div>投稿日時</div>
        </div>
        <h2>ConsultationTitle</h2>
        <p>内容...</p>
        <div className={styles.goodButtonArea}>
          <FavoriteBorderIcon />
          <div className={styles.goodCount}>123</div>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default ConsultationArea;
