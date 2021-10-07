import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { authCheckState, userProfileState } from "src/atoms/atom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ConsulDetailLikeButton from "../buttons/ConsulDetailLikeButton";
import styles from "styles/components/modules/ConsulDetailLike.module.css";
import { checkUserLike } from "src/firebase/firestore/common/get/firestore";

type Props = {
  numberOfLikes: number;
  consultationId: string;
  userId: string;
};

const ConsulDetailLike = (props: Props) => {
  // いいね数のstate
  const [like, setLike] = useState(props.numberOfLikes);
  // ユーザーがいいねしているかどうかのstate
  const [userLike, setUserLike] = useState({ check: false, status: false });
  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  useEffect(() => {
    const get = async () => {
      const userLike = await checkUserLike(
        userProfile.id,
        "consultations",
        props.consultationId
      );
      if (userLike) {
        setUserLike({ check: true, status: true });
      } else {
        setUserLike({ check: true, status: false });
      }
    };
    if (authCheck) {
      get();
    }
  }, [authCheck]);
  return (
    <>
      {userLike.status ? (
        <div>
          <FavoriteIcon color="primary" />
        </div>
      ) : (
        <div>
          <ConsulDetailLikeButton
            userId={props.userId}
            consultationId={props.consultationId}
            like={like}
            setLike={setLike}
            setUserLike={setUserLike}
          />
        </div>
      )}
      <div className={styles.numberOfLikes}>{like}</div>
    </>
  );
};

export default ConsulDetailLike;
