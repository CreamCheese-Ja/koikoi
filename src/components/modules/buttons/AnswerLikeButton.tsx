import React from "react";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import {
  defaultErrorAlertState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import { userOperationPossibleCheck } from "src/commonFunctions/userOperationPossibleCheck";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styles from "styles/components/modules/buttons/answerLikeButton.module.css";
import { AnswerData, AnswerList, ProfileItem } from "src/type";
import { writeAnswerLike } from "src/firebase/firestore/consultations/write/writeAnswerLike";

type Props = {
  consulDocId: string;
  answerDocId: string;
  likeUserId: string;
  userProfile: ProfileItem;
  answerList?: AnswerList;
  setAnswerList?: SetterOrUpdater<AnswerList>;
  bestAnswer?: AnswerData;
  setBestAnswer?: SetterOrUpdater<AnswerData | {}>;
  useLike: boolean;
  numberOfLikes: number;
};

const AnswerLikeButton = (props: Props) => {
  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // デフォルトエラーの変更関数
  const setDefaultError = useSetRecoilState(defaultErrorAlertState);

  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  // 回答に対する「いいね!」機能
  const like = async () => {
    // 自分の投稿には「いいね!」をさせない
    if (props.likeUserId === props.userProfile.id) {
      return;
    }
    const operationPossible = userOperationPossibleCheck(
      props.userProfile.name
    );
    if (typeof operationPossible !== "string") {
      // 「いいね!」のwrite処理
      const createLike = await writeAnswerLike(
        props.consulDocId,
        props.answerDocId,
        props.likeUserId,
        props.userProfile.id
      );
      if (createLike !== "error") {
        if (props.answerList && props.setAnswerList) {
          // 回答リストstateのデータを更新
          const newDataList = props.answerList.map((data) => {
            if (data.answerId === props.answerDocId) {
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
          props.setAnswerList(newDataList);
        } else if (props.setBestAnswer && props.bestAnswer) {
          // ベストアンサーstateのデータを更新
          props.setBestAnswer({
            ...props.bestAnswer,
            numberOfLikes: props.bestAnswer.numberOfLikes + 1,
          });
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
    <div className={styles.area}>
      {!props.useLike ? (
        <div onClick={like} className={styles.likeButton}>
          <FavoriteBorderIcon />
        </div>
      ) : (
        <div>
          <FavoriteIcon color="primary" />
        </div>
      )}
      <div className={styles.numberOfLikes}>{props.numberOfLikes}</div>
    </div>
  );
};

export default AnswerLikeButton;