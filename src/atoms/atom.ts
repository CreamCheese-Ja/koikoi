import { atom } from "recoil";
import {
  AnswerData,
  AnswerList,
  ConsultationList,
} from "src/firebase/firestore";

// ローディングスピナーON,OFF(恋愛相談リストの取得)
export const spinnerState = atom({
  key: "spinnerState",
  default: false,
});

// 恋愛相談用のもっと見るボタンの表示、非表示
export const displayConsulMoreButtonState = atom({
  key: "displayConsulMoreButtonState",
  default: true,
});

// ユーザーのプロフィールデータの型
export type ProfileItem = {
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

// 恋愛相談関連

// カテゴリー(form)
export const consultationCategoryState = atom({
  key: "consultationCategoryState",
  default: { text: "", errorStatus: false, errorMessage: "" },
});

// タイトル(form)
export const consultationTitleState = atom({
  key: "consultationTitleState",
  default: { text: "", errorStatus: false, errorMessage: "" },
});

// 内容(form)
export const consultationContentState = atom({
  key: "consultationContentState",
  default: { text: "", errorStatus: false, errorMessage: "" },
});
// 実行中(恋愛相談create)
export const postConsultationRunning = atom({
  key: "postConsultationRunning",
  default: false,
});

// 恋愛相談のリスト
export const consultationListState = atom<ConsultationList>({
  key: "consultationListState",
  default: [],
});

// 恋愛相談詳細

// 補足フィールドの表示
export const displaySupplementFieldState = atom({
  key: "displaySupplementFieldState",
  default: false,
});

// 補足の型
export type Supplements = {
  [s: string]: string;
};
// 補足のstate
export const supplementsState = atom<Supplements>({
  key: "supplementsState",
  default: {},
});

// 回答数
export const numberOfAnswerState = atom({
  key: "numberOfAnswerState",
  default: 0,
});

// 回答内容(form)
export const answerState = atom({
  key: "answerState",
  default: { text: "", errorStatus: false, errorMessage: "" },
});

// 実行中(回答create)
export const postAnswerRunningState = atom({
  key: "postAnswerRunning",
  default: false,
});

// 回答リストのstate
export const answerListState = atom<AnswerList>({
  key: "answerListState",
  default: [],
});

// ベストアンサーのstate
export const bestAnswerState = atom<AnswerData | {}>({
  key: "bestAnswerState",
  default: {},
});

// 実行中(回答リストget)
export const getAnswerListRunningState = atom({
  key: "getAnswerListRunningState",
  default: false,
});
