import { atom } from "recoil";

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

export const loginAndSignUpFormState = atom({
  key: "loginAndSignUpFormState",
  default: {
    title: "",
    status: false,
  },
});

export const userMenuState = atom<null | HTMLElement>({
  key: "userMenuState",
  default: null,
});

export const logoutAlertState = atom({
  key: "logoutAlertState",
  default: false,
});
