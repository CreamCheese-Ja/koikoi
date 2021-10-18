import { atom } from "recoil";
import {
  AnswerData,
  AnswerList,
  ConsultationList,
  ProfileItem,
  TweetCommentList,
  TweetList,
} from "src/type";

// ローディングスピナーON,OFF(恋愛相談リスト,つぶやきリストの取得)
export const spinnerState = atom({
  key: "spinnerState",
  default: false,
});

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

// ***************************恋愛相談関連***************************

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

// 恋愛相談用のもっと見るボタンの表示、非表示
export const displayConsulMoreButtonState = atom({
  key: "displayConsulMoreButtonState",
  default: true,
});

// ***************************恋愛相談詳細***************************

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

// 解決、未解決
export const isSolutionState = atom({
  key: "isSolutionState",
  default: false,
});

// 回答数
export const numberOfAnswerState = atom({
  key: "numberOfAnswerState",
  default: 0,
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

// 実行中(回答リストget、もっと見るボタン押下時にspinnerを表示)
export const getAnswerListRunningState = atom({
  key: "getAnswerListRunningState",
  default: false,
});

// 返信フィールドの表示
export const showAnswerReplyFieldState = atom({
  key: "showAnswerReplyFieldState",
  default: false,
});

// ***************************つぶやき関連***************************

// つぶやきリスト
export const tweetListState = atom<TweetList>({
  key: "tweetListState",
  default: [],
});

// コメントリスト
export const tweetCommentListState = atom<TweetCommentList>({
  key: "tweetCommentListState",
  default: [],
});

// コメント数
export const tweetCommentCountState = atom({
  key: "tweetCommentCountState",
  default: 0,
});

// 恋愛相談用のもっと見るボタンの表示、非表示
export const showTweetMoreButtonState = atom({
  key: "showTweetMoreButtonState",
  default: true,
});

// 実行中(コメントリストget、もっと見るボタン押下時にspinnerを表示)
export const getTweetCommentListRunningState = atom({
  key: "getTweetCommentListRunningState",
  default: false,
});
