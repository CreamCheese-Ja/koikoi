import React from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { userOperationPossibleCheck } from "src/commonFunctions/userOperationPossibleCheck";
import { useSetRecoilState } from "recoil";
import {
  defaultErrorAlertState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import { writeConsulAndTweetLike } from "src/firebase/firestore/common/write/writeConsulAndTweetLike";
import { ProfileItem } from "src/type";

type Props = {
  userId: string;
  collectionId: string;
  docId: string;
  userProfile: ProfileItem;
  updateList: (likeDocId: string) => void;
};

const ListLikeButton = (props: Props) => {
  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);
  // デフォルトエラーの変更関数
  const setDefaultError = useSetRecoilState(defaultErrorAlertState);
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

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
      const createLike = await writeConsulAndTweetLike(
        props.collectionId,
        props.docId,
        props.userId,
        props.userProfile.id
      );
      if (createLike !== "error") {
        // 現在の恋愛相談リストのデータを更新する
        props.updateList(props.docId);
        // サクセスメッセージ
        setSuccess({ status: true, message: createLike });
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

  return (
    <div style={{ cursor: "pointer" }} onClick={like}>
      <FavoriteBorderIcon />
    </div>
  );
};

export default ListLikeButton;
