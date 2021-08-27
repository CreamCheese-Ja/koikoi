import { atom } from "recoil";

// ユーザーのプロフィールデータの型
type ProfileItem = {
  name: string;
  photoURL: string;
  gender: string;
  age: string;
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
