import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ageItem,
  bloodTypeItem,
  genderItem,
  jobItem,
  signItem,
} from "src/common/selectItems";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  consultationListState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  tweetListState,
  userBestAnswerRankingListState,
  userLikeRankingListState,
  userProfileState,
} from "src/atoms/atom";
import { uploadUserImage } from "src/firebase/storage/uploadUserImage";
import { getUserImageUrl } from "src/firebase/storage/getUserImageUrl";
import { updateProfileData } from "src/firebase/firestore/users/write/updateProfileData";

export const useEditProfile = (
  message: string,
  gender: string,
  age: string,
  job: string,
  bloodType: string,
  sign: string,
  setRunning: Dispatch<SetStateAction<boolean>>,
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>
) => {
  const [croppedImage, setCroppedImage] = useState("");

  const [fieldMessage, setFieldMessage] = useState({
    text: message,
    errorStatus: false,
    errorMessage: "",
  });
  const [fieldGender, setFieldGender] = useState({
    text: gender,
    errorStatus: false,
    errorMessage: "",
  });
  const [fieldAge, setFieldAge] = useState({
    text: age,
    errorStatus: false,
    errorMessage: "",
  });
  const [fieldJob, setFieldJob] = useState({
    text: job,
    errorStatus: false,
    errorMessage: "",
  });
  const [fieldBloodType, setFieldBloodType] = useState({
    text: bloodType,
    errorStatus: false,
    errorMessage: "",
  });
  const [fieldSign, setFieldSign] = useState({
    text: sign,
    errorStatus: false,
    errorMessage: "",
  });
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);
  // 恋愛相談リスト変更関数
  const setConsultationList = useSetRecoilState(consultationListState);
  // つぶやきリスト変更関数
  const setTweetList = useSetRecoilState(tweetListState);
  // ユーザーいいねランキングリスト変更関数
  const setUserLikeRankingList = useSetRecoilState(userLikeRankingListState);
  // ユーザーBAランキングリスト変更関数
  const setUserBestAnswerRankingList = useSetRecoilState(
    userBestAnswerRankingListState
  );

  const selectValues = [
    {
      value: fieldGender,
      setValue: setFieldGender,
      label: "性別",
      select: genderItem,
    },
    { value: fieldAge, setValue: setFieldAge, label: "年齢", select: ageItem },
    { value: fieldJob, setValue: setFieldJob, label: "職業", select: jobItem },
    {
      value: fieldBloodType,
      setValue: setFieldBloodType,
      label: "血液型",
      select: bloodTypeItem,
    },
    {
      value: fieldSign,
      setValue: setFieldSign,
      label: "星座",
      select: signItem,
    },
  ];

  useEffect(() => {
    setFieldMessage((message) => ({
      ...message,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [fieldMessage.text]);

  // ユーザー情報の更新
  const updateProfile = async () => {
    if (fieldMessage.text.length > 1000) {
      setFieldMessage((message) => ({
        ...message,
        errorStatus: true,
        errorMessage: "自己紹介は1000文字以内です。",
      }));
      return;
    }
    setRunning(true);
    if (croppedImage !== "") {
      // 画像変更を行なった場合
      // ①storageに画像を保存
      const uploadResult = await uploadUserImage(userProfile.id, croppedImage);
      if (!uploadResult) {
        setError({ status: true, message: "エラーが発生しました。" });
        setRunning(false);
        return;
      }
      // ②storageのURLを取得
      const getUrlResult = await getUserImageUrl(userProfile.id);
      if (!getUrlResult) {
        setError({ status: true, message: "エラーが発生しました。" });
        setRunning(false);
        return;
      }
      // ③画像のURLとプロフィールをfirestoreに登録
      const updateResult = await updateProfileData(
        userProfile.id,
        getUrlResult,
        fieldMessage.text,
        fieldGender.text,
        fieldAge.text,
        fieldJob.text,
        fieldBloodType.text,
        fieldSign.text
      );
      if (!updateResult) {
        setError({ status: true, message: "エラーが発生しました。" });
        setRunning(false);
        return;
      }
      // ④プロフィールstateを更新
      setUserProfile((data) => ({
        ...data,
        photoURL: getUrlResult,
        message: fieldMessage.text,
        gender: fieldGender.text,
        age: fieldAge.text,
        job: fieldJob.text,
        bloodType: fieldBloodType.text,
        sign: fieldSign.text,
      }));
      // ⑤恋愛相談、つぶやきリスト、ランキングを更新
      setConsultationList((listData) => {
        const newListData = listData.map((data) => {
          if (data.user.id === userProfile.id) {
            const userData = data.user;
            const newData = {
              ...data,
              user: { ...userData, photoURL: getUrlResult },
            };
            return newData;
          } else {
            return data;
          }
        });
        return newListData;
      });
      setTweetList((listData) => {
        const newListData = listData.map((data) => {
          if (data.user.id === userProfile.id) {
            const userData = data.user;
            const newData = {
              ...data,
              user: { ...userData, photoURL: getUrlResult },
            };
            return newData;
          } else {
            return data;
          }
        });
        return newListData;
      });
      setUserLikeRankingList((listData) => {
        const newListData = listData.map((data) => {
          if (data.id === userProfile.id) {
            const newData = { ...data, photoURL: getUrlResult };
            return newData;
          } else {
            return data;
          }
        });
        return newListData;
      });
      setUserBestAnswerRankingList((listData) => {
        const newListData = listData.map((data) => {
          if (data.id === userProfile.id) {
            const newData = { ...data, photoURL: getUrlResult };
            return newData;
          } else {
            return data;
          }
        });
        return newListData;
      });
    } else {
      // 画像変更を行なわなかった場合
      // ①プロフィールをfirestoreに登録
      const updateResult = await updateProfileData(
        userProfile.id,
        userProfile.photoURL,
        fieldMessage.text,
        fieldGender.text,
        fieldAge.text,
        fieldJob.text,
        fieldBloodType.text,
        fieldSign.text
      );
      if (!updateResult) {
        setError({ status: true, message: "エラーが発生しました。" });
        setRunning(false);
        return;
      }
      // ②プロフィールstateを更新
      setUserProfile((data) => ({
        ...data,
        message: fieldMessage.text,
        gender: fieldGender.text,
        age: fieldAge.text,
        job: fieldJob.text,
        bloodType: fieldBloodType.text,
        sign: fieldSign.text,
      }));
    }
    setRunning(false);
    setSuccess({ status: true, message: "プロフィールを更新しました。" });
    setIsDialogOpen(false);
  };
  return {
    userProfile,
    croppedImage,
    setCroppedImage,
    fieldMessage,
    setFieldMessage,
    selectValues,
    updateProfile,
  };
};
