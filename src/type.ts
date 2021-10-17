import firebase from "src/firebase/firebase";

type TimeStamp = firebase.firestore.Timestamp;

// ユーザーデータの型
export type UserData = {
  id: string;
  name: string;
  photoURL: string;
};

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

// 恋愛相談リストの型
export type ConsultationList = {
  user: UserData;
  consultationId: string;
  category: string;
  title: string;
  content: string;
  supplement: string;
  solution: boolean;
  numberOfLikes: number;
  numberOfAnswer: number;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  userLike: boolean;
}[];

// 恋愛相談1件の型
export type ConsultationData = {
  user: UserData;
  consultationId: string;
  category: string;
  title: string;
  content: string;
  supplement: string;
  solution: boolean;
  numberOfLikes: number;
  numberOfAnswer: number;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  userLike: boolean;
};

// 恋愛相談詳細(SSR)の型
export type ConsultationDetails = {
  user: UserData;
  consultationId: string;
  category: string;
  title: string;
  content: string;
  supplement: string;
  solution: boolean;
  numberOfLikes: number;
  numberOfAnswer: number;
  createdAt: string;
  updatedAt: string;
  supplementCreatedAt: string;
};

// 回答リストの型
export type AnswerList = {
  user: UserData;
  answerId: string;
  content: string;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  numberOfLikes: number;
  bestAnswer: boolean;
  comment: string;
  commentCreatedAt: TimeStamp | null;
  userLike: boolean;
}[];

// 回答1件の型
export type AnswerData = {
  user: UserData;
  answerId: string;
  content: string;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  numberOfLikes: number;
  bestAnswer: boolean;
  comment: string;
  commentCreatedAt: TimeStamp;
  userLike: boolean;
};

// つぶやき1件の型
export type TweetData = {
  user: UserData;
  tweetId: string;
  category: string;
  content: string;
  numberOfLikes: number;
  numberOfComments: number;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  userLike: boolean;
};

// つぶやきリストの型
export type TweetList = TweetData[];

// つぶやき詳細(SSR)の型
export type TweetDetails = {
  user: UserData;
  tweetId: string;
  category: string;
  content: string;
  numberOfLikes: number;
  numberOfComments: number;
  createdAt: string;
  updatedAt: string;
};

// つぶやきコメント1件の型
export type TweetCommentData = {
  user: UserData;
  commentId: string;
  content: string;
  createdAt: TimeStamp;
  updatedAt: TimeStamp;
  numberOfLikes: number;
  userLike: boolean;
};

// つぶやきコメントリストの型
export type TweetCommentList = TweetCommentData[];
