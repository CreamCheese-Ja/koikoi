import { atom } from "recoil";

// ユーザーのプロフィールデータの型
type ProfileItem = {
  name: string;
  photoURL: string;
  gender: string;
  age: string;
  job: string;
  bloodType: string;
  sign: string;
  numberOfBestAnswer: number;
  numberOfLikes: number;
};

// ユーザーのプロフィールデータ
export const userProfileState = atom<ProfileItem>({
  key: "userProfileState",
  default: {
    name: "",
    photoURL: "",
    gender: "",
    age: "",
    job: "",
    bloodType: "",
    sign: "",
    numberOfBestAnswer: 0,
    numberOfLikes: 0,
  },
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

// 恋愛相談の入力フォーム

// カテゴリー
export const consultationCategoryState = atom({
  key: "consultationCategoryState",
  default: "",
});

// タイトル
export const consultationTitleState = atom({
  key: "consultationTitleState",
  default: "",
});

// 内容
export const consultationContentState = atom({
  key: "consultationContentState",
  default: "",
});

// エラー
export const consultationErrorState = atom({
  key: "consultationErrorState",
  default: { category: false, title: false, content: false },
});

// エラーメッセージ
export const consultationErrorMessageState = atom({
  key: "consultationErrorMessageState",
  default: { category: "", title: "", content: "" },
});
