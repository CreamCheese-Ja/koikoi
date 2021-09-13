import React from "react";
import styles from "styles/components/atoms/buttons/consulAndTweetGoodButton.module.css";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { createConsulAndTweetLike } from "src/firebase/firestore";
import { userOperationPossibleCheck } from "src/commonFunctions/userOperationPossibleCheck";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  consultationListState,
  defaultErrorAlertState,
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  userProfileState,
} from "src/atoms/atom";
import firebase from "src/firebase/firebase";

type Props = {
  userId: string;
  userName: string;
  userPhotoURL: string;
  consultationId: string;
  category: string;
  title: string;
  content: string;
  supplement: string;
  solution: boolean;
  numberOfLikes: number;
  numberOfAnswer: number;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
};

const ConsulGoodButton = (props: Props) => {
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
  const good = async () => {
    // 自分の投稿にはいいねをさせない
    if (props.userId === userProfile.id) {
      return;
    }
    const operationPossible = userOperationPossibleCheck(userProfile.name);
    if (typeof operationPossible !== "string") {
      const createGood = await createConsulAndTweetLike(
        "consultations",
        props.consultationId,
        props.userId,
        userProfile.id
      );
      if (createGood !== "error") {
        // 現在の恋愛相談リストのデータを更新する
        const dataList = consultationList;
        const newDataList = dataList.map((data) => {
          if (data.consultationId === props.consultationId) {
            return {
              user: {
                id: props.userId,
                name: props.userName,
                photoURL: props.userPhotoURL,
              },
              consultationId: props.consultationId,
              category: props.category,
              title: props.title,
              content: props.content,
              supplement: props.supplement,
              solution: props.solution,
              numberOfLikes: props.numberOfLikes + 1,
              numberOfAnswer: props.numberOfAnswer,
              createdAt: props.createdAt,
              updatedAt: props.updatedAt,
              userLike: true,
            };
          } else {
            return data;
          }
        });
        setConsultationList(newDataList);
        // サクセスメッセージ
        setSuccess({ status: true, message: createGood });
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
    <div className={styles.goodButton} onClick={good}>
      <FavoriteBorderIcon />
    </div>
  );
};

export default ConsulGoodButton;
