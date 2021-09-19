import React, { Dispatch, SetStateAction } from "react";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import styles from "styles/components/atoms/buttons/likeButton.module.css";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  consultationListState,
  defaultErrorAlertState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  userProfileState,
} from "src/atoms/atom";
import { userOperationPossibleCheck } from "src/commonFunctions/userOperationPossibleCheck";
import { createConsulAndTweetLike } from "src/firebase/firestore";

type Props = {
  userId: string;
  consultationId: string;
  like: number;
  setLike: Dispatch<SetStateAction<number>>;
  setUserLike: Dispatch<
    SetStateAction<{
      check: boolean;
      status: boolean;
    }>
  >;
};

const ConsulDetailLikeButton = (props: Props) => {
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

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
    if (props.userId === userProfile.id) {
      return;
    }
    const operationPossible = userOperationPossibleCheck(userProfile.name);
    if (typeof operationPossible !== "string") {
      const createLike = await createConsulAndTweetLike(
        "consultations",
        props.consultationId,
        props.userId,
        userProfile.id
      );
      if (createLike !== "error") {
        // 詳細ページのいいね数をインクリメント
        props.setLike(() => props.like + 1);
        // いいね済みにする
        props.setUserLike({ check: true, status: true });
        // 恋愛相談リストのデータを更新する
        if (consultationList.length !== 0) {
          const dataList = consultationList;
          const newDataList = dataList.map((data) => {
            if (data.consultationId === props.consultationId) {
              return {
                user: {
                  id: data.user.id,
                  name: data.user.name,
                  photoURL: data.user.photoURL,
                },
                consultationId: data.consultationId,
                category: data.category,
                title: data.title,
                content: data.content,
                supplement: data.supplement,
                solution: data.solution,
                numberOfLikes: data.numberOfLikes + 1,
                numberOfAnswer: data.numberOfAnswer,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
                userLike: true,
              };
            } else {
              return data;
            }
          });
          setConsultationList(newDataList);
        }
        // サクセスメッセージ
        setSuccess({ status: true, message: createLike });
      } else {
        // エラーメッセージ
        setDefaultError(true);
      }
    } else if (operationPossible === "ログインが必要です。") {
      // ログインフォームを開く
      setLoginAndSignUpForm({ title: "ログイン", status: true });
      setError({ status: true, message: `いいねするには${operationPossible}` });
    } else if (
      operationPossible === "メールアドレスの確認が完了していません。"
    ) {
      setError({ status: true, message: operationPossible });
    }
  };

  return (
    <div className={styles.likeButtonArea} onClick={like}>
      <FavoriteBorderIcon />
    </div>
  );
};

export default ConsulDetailLikeButton;
