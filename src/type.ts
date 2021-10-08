import firebase from "src/firebase/firebase";

type TimeStamp = firebase.firestore.Timestamp;

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
  user: {
    id: string;
    name: string;
    photoURL: string;
  };
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

// 単体の恋愛相談の型
export type ConsultationData = {
  user: {
    id: string;
    name: string;
    photoURL: string;
  };
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
  user: {
    id: string;
    name: string;
    photoURL: string;
  };
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

// 恋愛相談詳細の中の回答リストの型
export type AnswerList = {
  user: {
    id: string;
    name: string;
    photoURL: string;
  };
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
  user: {
    id: string;
    name: string;
    photoURL: string;
  };
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
