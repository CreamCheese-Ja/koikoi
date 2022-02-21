import firebase from "src/firebase/firebase";
import { useSetRecoilState } from "recoil";
import {
  loginAndSignUpFormState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";

export const useSocialLogin = () => {
  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // 新規登録、ログインフォーム
  const setLoginAndSignUpForm = useSetRecoilState(loginAndSignUpFormState);

  // Googleログイン
  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    setLoginAndSignUpForm({ title: "", status: false });
    try {
      await firebase.auth().signInWithPopup(provider);
      // 新規登録、ログインダイアログを閉じる処理
      setSuccess({ status: true, message: "ログインしました。" });
    } catch {
      setError({
        status: true,
        message: "正常にログインできませんでした。",
      });
    }
  };

  return { googleLogin };
};
