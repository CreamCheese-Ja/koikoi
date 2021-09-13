import { atom } from "recoil";
import { ConsultationList } from "src/firebase/firestore";

// ユーザーのプロフィールデータの型
type ProfileItem = {
  id: string;
  name: string;
  photoURL: string;
  gender: string;
  age: string;
  job: string;
  bloodType: string;
  sign: string;
  message: string;
  numberOfBestAnswer: number;
  numberOfLikes: number;
};

// ユーザーのプロフィールデータ
export const userProfileState = atom<ProfileItem>({
  key: "userProfileState",
  default: {
    id: "noUser",
    name: "",
    photoURL: "",
    gender: "",
    age: "",
    job: "",
    bloodType: "",
    sign: "",
    message: "",
    numberOfBestAnswer: 0,
    numberOfLikes: 0,
  },
});

// onAuthStateChangedでチェックが終わっているかどうかのstate
export const authCheckState = atom({
  key: "authCheckState",
  default: false,
});

// ログイン、新規登録フォーム開閉
export const loginAndSignUpFormState = atom({
  key: "loginAndSignUpFormState",
  default: {
    title: "",
    status: false,
  },
});

// パスワード変更ダイアログ開閉
export const passwordChangeDialogState = atom({
  key: "passwordChangeDialogState",
  default: false,
});

// ユーザーメニュー開閉
export const userMenuState = atom<null | HTMLElement>({
  key: "userMenuState",
  default: null,
});

// 投稿メニュー開閉
export const postMenuState = atom<null | HTMLElement>({
  key: "postMenuState",
  default: null,
});

// 恋愛相談投稿ダイアログ開閉
export const createConsultationDialogState = atom({
  key: "createConsultationDialogState",
  default: false,
});

// つぶやき投稿ダイアログ開閉
export const createTweetDialogState = atom({
  key: "createTweetDialogState",
  default: false,
});

// ログアウト時のアラート
export const logoutAlertState = atom({
  key: "logoutAlertState",
  default: false,
});

// ログイン時のアラート
export const loginAlertState = atom({
  key: "loginAlertState",
  default: false,
});

// 共通のエラーアラート
export const defaultErrorAlertState = atom({
  key: "defaultErrorAlertState",
  default: false,
});

// 多目的エラーアラート(これを基本にする)
export const multipurposeErrorAlertState = atom({
  key: "multipurposeErrorAlertState",
  default: {
    status: false,
    message: "",
  },
});

// 多目的サクセスアラート(これを基本にする)
export const multipurposeSuccessAlertState = atom({
  key: "multipurposeSuccessAlertState",
  default: {
    status: false,
    message: "",
  },
});

// 恋愛相談の入力フォーム

// カテゴリー
export const consultationCategoryState = atom({
  key: "consultationCategoryState",
  default: { text: "", errorStatus: false, errorMessage: "" },
});

// タイトル
export const consultationTitleState = atom({
  key: "consultationTitleState",
  default: { text: "", errorStatus: false, errorMessage: "" },
});

// 内容
export const consultationContentState = atom({
  key: "consultationContentState",
  default: { text: "", errorStatus: false, errorMessage: "" },
});
// 実行中
export const postConsultationRunning = atom({
  key: "postConsultationRunning",
  default: false,
});

// 恋愛相談のリスト
export const consultationListState = atom<ConsultationList>({
  key: "consultationListState",
  default: [],
});
