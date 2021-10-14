import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authCheckState,
  consultationListState,
  defaultErrorAlertState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { checkUserLike } from "src/firebase/firestore/common/get/checkUserLike";
import { userOperationPossibleCheck } from "src/commonFunctions/userOperationPossibleCheck";
import { writeConsulAndTweetLike } from "src/firebase/firestore/common/write/writeConsulAndTweetLike";
import { ProfileItem } from "src/type";

type Props = {
  numberOfLikes: number;
  docId: string;
  userId: string;
  userProfile: ProfileItem;
};

const ConsulDetailLikeButton = (props: Props) => {
  // いいね数のstate
  const [likeCount, setLikeCount] = useState(props.numberOfLikes);
  // ユーザーがいいねしているかどうかのstate
  const [userLike, setUserLike] = useState({ check: false, status: false });
  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);
  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);
  // デフォルトエラーの変更関数
  const setDefaultError = useSetRecoilState(defaultErrorAlertState);
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);
  // 恋愛相談リストのstate
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );

  // 相談に対するいいね機能
  const like = async () => {
    // 自分の投稿にはいいねをさせない
    if (props.userId === props.userProfile.id) {
      return;
    }
    const operationPossible = userOperationPossibleCheck(
      props.userProfile.name
    );
    if (typeof operationPossible !== "string") {
      const isCreateLike = await writeConsulAndTweetLike(
        "consultations",
        props.docId,
        props.userId,
        props.userProfile.id
      );
      if (isCreateLike) {
        // 詳細ページのいいね数をインクリメント
        setLikeCount((likeCount) => likeCount + 1);
        // いいね済みにする
        setUserLike({ check: true, status: true });
        // 恋愛相談リストのデータを更新する
        if (consultationList.length !== 0) {
          const newDataList = consultationList.map((data) => {
            if (data.consultationId === props.docId) {
              const newData = {
                ...data,
                numberOfLikes: data.numberOfLikes + 1,
                userLike: true,
              };
              return newData;
            } else {
              return data;
            }
          });
          setConsultationList(newDataList);
        }
        // サクセスメッセージ
        setSuccess({ status: true, message: "「いいね！」しました。" });
      } else {
        // エラーメッセージ
        setDefaultError(true);
      }
    } else if (operationPossible === "ログインが必要です。") {
      // ログインフォームを開く
      setLoginAndSignUpForm({ title: "ログイン", status: true });
      setError({
        status: true,
        message: `「いいね!」するには${operationPossible}`,
      });
    } else if (
      operationPossible === "メールアドレスの確認が完了していません。"
    ) {
      setError({ status: true, message: operationPossible });
    }
  };

  useEffect(() => {
    const get = async () => {
      const userLike = await checkUserLike(
        props.userProfile.id,
        "consultations",
        props.docId
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
        <div style={{ cursor: "pointer" }} onClick={like}>
          <FavoriteBorderIcon />
        </div>
      )}
      <div style={{ marginLeft: "5px" }}>{likeCount}</div>
    </>
  );
};

export default ConsulDetailLikeButton;
