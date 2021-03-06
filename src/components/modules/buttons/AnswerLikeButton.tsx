import { SetterOrUpdater, useSetRecoilState } from "recoil";
import {
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import { userOperationPossibleCheck } from "src/common/userOperationPossibleCheck";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styles from "styles/components/modules/buttons/answerLikeButton.module.css";
import { AnswerData, AnswerList, ProfileItem } from "src/type";
import { writeAnswerAndCommentLike } from "src/firebase/firestore/common/write/writeAnswerAndCommentLike";

type Props = {
  consulDocId: string;
  answerDocId: string;
  likeUserId: string;
  userProfile: ProfileItem;
  answerList?: AnswerList;
  setAnswerList?: SetterOrUpdater<AnswerList>;
  bestAnswer?: AnswerData;
  setBestAnswer?: SetterOrUpdater<AnswerData | {}>;
  userLike: boolean;
  numberOfLikes: number;
};

const AnswerLikeButton = (props: Props) => {
  const {
    consulDocId,
    answerDocId,
    likeUserId,
    userProfile,
    answerList,
    setAnswerList,
    bestAnswer,
    setBestAnswer,
    userLike,
    numberOfLikes,
  } = props;

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  // 回答に対する「いいね!」機能
  const like = async () => {
    const operationPossible = userOperationPossibleCheck(userProfile.name);
    if (typeof operationPossible !== "string") {
      // 「いいね!」のwrite処理
      const isCreateLike = await writeAnswerAndCommentLike(
        "consultations",
        "answers",
        consulDocId,
        answerDocId,
        likeUserId,
        userProfile.id
      );
      if (isCreateLike) {
        if (answerList && setAnswerList) {
          // 回答リストstateのデータを更新
          const newDataList = answerList.map((data) => {
            if (data.answerId === answerDocId) {
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
          setAnswerList(newDataList);
        } else if (setBestAnswer && bestAnswer) {
          // ベストアンサーstateのデータを更新
          setBestAnswer({
            ...bestAnswer,
            numberOfLikes: bestAnswer.numberOfLikes + 1,
            userLike: true,
          });
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

  const isPostUser = likeUserId === userProfile.id;

  return (
    <div className={styles.area}>
      {!userLike ? (
        <div
          onClick={isPostUser ? () => {} : like}
          className={styles.likeButton}
          style={{
            cursor: isPostUser ? "initial" : "pointer",
          }}
        >
          <FavoriteBorderIcon
            style={{
              color: isPostUser ? "#b0b0b0" : "#000",
            }}
          />
        </div>
      ) : (
        <div>
          <FavoriteIcon color="primary" />
        </div>
      )}
      <div className={styles.numberOfLikes}>{numberOfLikes}</div>
    </div>
  );
};

export default AnswerLikeButton;
