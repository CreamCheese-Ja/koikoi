import { SetterOrUpdater, useSetRecoilState } from "recoil";
import {
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import styles from "styles/components/modules/buttons/answerLikeButton.module.css";
import { ProfileItem, TweetCommentList } from "src/type";
import { userOperationPossibleCheck } from "src/common/userOperationPossibleCheck";
import { writeAnswerAndCommentLike } from "src/firebase/firestore/common/write/writeAnswerAndCommentLike";

type Props = {
  tweetId: string;
  commentId: string;
  likeUserId: string;
  userProfile: ProfileItem;
  commentList: TweetCommentList;
  setCommentList: SetterOrUpdater<TweetCommentList>;
  userLike: boolean;
  numberOfLikes: number;
};

const TweetCommentLikeButton = (props: Props) => {
  const {
    tweetId,
    commentId,
    likeUserId,
    userProfile,
    commentList,
    setCommentList,
    userLike,
    numberOfLikes,
  } = props;

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  const like = async () => {
    const operationPossible = userOperationPossibleCheck(userProfile.name);
    if (operationPossible === "ログインが必要です。") {
      // ログインフォームを開く
      setLoginAndSignUpForm({ title: "ログイン", status: true });
      setError({
        status: true,
        message: `「いいね!」するには${operationPossible}`,
      });
      return;
    }
    if (operationPossible === "メールアドレスの確認が完了していません。") {
      setError({ status: true, message: operationPossible });
      return;
    }
    // 「いいね!」のwrite処理
    const isCreateLike = await writeAnswerAndCommentLike(
      "tweets",
      "comments",
      tweetId,
      commentId,
      likeUserId,
      userProfile.id
    );
    if (isCreateLike) {
      // 回答リストstateのデータを更新
      const newDataList = commentList.map((data) => {
        if (data.commentId === commentId) {
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
      setCommentList(newDataList);
      // サクセスメッセージ
      setSuccess({ status: true, message: "「いいね！」しました。" });
    } else {
      // エラーメッセージ
      setError({ status: true, message: "エラーが発生しました。" });
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

export default TweetCommentLikeButton;
