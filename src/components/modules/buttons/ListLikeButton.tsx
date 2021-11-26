import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { userOperationPossibleCheck } from "src/common/userOperationPossibleCheck";
import { useSetRecoilState } from "recoil";
import {
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
  const { userId, collectionId, docId, userProfile, updateList } = props;

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);
  // ログイン、新規登録フォーム用の変更関数
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  // 相談に対するいいね機能
  const like = async () => {
    const operationPossible = userOperationPossibleCheck(userProfile.name);
    if (typeof operationPossible !== "string") {
      const isCreateLike = await writeConsulAndTweetLike(
        collectionId,
        docId,
        userId,
        userProfile.id
      );
      if (isCreateLike) {
        // 現在の恋愛相談リストのデータを更新する
        updateList(docId);
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

  const isPostUser = userId === userProfile.id;

  return (
    <div
      style={{ cursor: isPostUser ? "initial" : "pointer" }}
      onClick={isPostUser ? () => {} : like}
    >
      <FavoriteBorderIcon style={{ color: isPostUser ? "#b0b0b0" : "#000" }} />
    </div>
  );
};

export default ListLikeButton;
