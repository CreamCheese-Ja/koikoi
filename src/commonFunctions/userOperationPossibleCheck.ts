import { checkEmailVerified } from "src/firebase/authentication";

// ユーザー操作が可能かどうかチェックする関数
export const userOperationPossibleCheck = (
  userName: string
): boolean | string => {
  const emailVerified = checkEmailVerified();
  if (userName !== "") {
    if (emailVerified) {
      return true;
    } else {
      return "メールアドレスの確認が完了していません。";
    }
  } else {
    return "ログインが必要です。";
  }
};
