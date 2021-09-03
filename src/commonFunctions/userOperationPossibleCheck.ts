import { checkEmailVerified } from "src/firebase/authentication";

// ユーザー操作が可能かどうかチェックする関数
export const userOperationPossibleCheck = (
  userName: string
): boolean | string => {
  const emailVerified = checkEmailVerified();
  if (emailVerified) {
    if (userName !== "") {
      return true;
    } else {
      return "ユーザー情報がありません。";
    }
  } else {
    return "メールアドレスの確認が完了していません。";
  }
};
