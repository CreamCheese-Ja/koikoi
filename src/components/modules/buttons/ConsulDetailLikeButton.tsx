import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  authCheckState,
  consultationListState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { getIsUserLike } from "src/firebase/firestore/common/get/getIsUserLike";
import { userOperationPossibleCheck } from "src/common/userOperationPossibleCheck";
import { writeConsulAndTweetLike } from "src/firebase/firestore/common/write/writeConsulAndTweetLike";
import { ProfileItem } from "src/type";

type Props = {
  numberOfLikes: number;
  docId: string;
  userId: string;
  userProfile: ProfileItem;
};

const ConsulDetailLikeButton = (props: Props) => {
  const { numberOfLikes, docId, userId, userProfile } = props;

  // いいね数のstate
  const [likeCount, setLikeCount] = useState(numberOfLikes);
  // ユーザーがいいねしているかどうかのstate
  const [userLike, setUserLike] = useState({ check: false, status: false });
  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);
  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);
  // 恋愛相談リストのstate
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );

  // 相談に対するいいね機能
  const like = async () => {
    const operationPossible = userOperationPossibleCheck(userProfile.name);
    if (typeof operationPossible !== "string") {
      const isCreateLike = await writeConsulAndTweetLike(
        "consultations",
        docId,
        userId,
        userProfile.id
      );
      if (isCreateLike) {
        // 詳細ページのいいね数をインクリメント
        setLikeCount((likeCount) => likeCount + 1);
        // いいね済みにする
        setUserLike({ check: true, status: true });
        // 恋愛相談リストのデータを更新する
        if (consultationList.length !== 0) {
          const newDataList = consultationList.map((data) => {
            if (data.consultationId === docId) {
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
        setError({ status: true, message: "エラーが発生しました。" });
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
      const isUserLike = await getIsUserLike(
        userProfile.id,
        "consultations",
        docId
      );
      if (isUserLike) {
        setUserLike({ check: true, status: true });
      } else {
        setUserLike({ check: true, status: false });
      }
    };
    if (authCheck) {
      get();
    }
  }, [authCheck]);

  const isPostUser = userId === userProfile.id;

  return (
    <>
      {userLike.status ? (
        <div>
          <FavoriteIcon color="primary" />
        </div>
      ) : (
        <div
          style={{ cursor: isPostUser ? "initial" : "pointer" }}
          onClick={isPostUser ? () => {} : like}
        >
          <FavoriteBorderIcon
            style={{ color: isPostUser ? "#b0b0b0" : "#000" }}
          />
        </div>
      )}
      <div style={{ marginLeft: "5px" }}>{likeCount}</div>
    </>
  );
};

export default ConsulDetailLikeButton;
