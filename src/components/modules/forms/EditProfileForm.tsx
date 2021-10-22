import React, { useState } from "react";
import {
  ageItem,
  bloodTypeItem,
  genderItem,
  jobItem,
  signItem,
} from "src/common/selectItems";
import MultilineTextField from "src/components/atoms/input/MultilineTextField";
import SelectBox from "src/components/atoms/input/SelectBox";
import BasicExecutionButton from "src/components/atoms/buttons/BasicExecutionButton";
import styles from "styles/components/modules/forms/editProfileForm.module.css";
import InputImage from "src/components/atoms/input/InputImage";
import { useRecoilState } from "recoil";
import { userProfileState } from "src/atoms/atom";

type Props = {
  message: string;
  gender: string;
  age: string;
  job: string;
  bloodType: string;
  sign: string;
  running: boolean;
};

const EditProfileForm = (props: Props) => {
  const { message, gender, age, job, bloodType, sign, running } = props;

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

  const updateProfile = () => {
    // ①storageに画像を保存
    // ②storageのURLを取得
    // ③画像のURLとプロフィールをfirestoreに登録
    // ④上記の内容でプロフィールstateを更新
  };

  return (
    <div>
      <div>
        <InputImage photoURL={userProfile.photoURL} />
      </div>
      <div className={styles.input}>
        <MultilineTextField
          label="自己紹介"
          value={fieldMessage.text}
          setValue={setFieldMessage}
          error={fieldMessage.errorStatus}
          errorMessage={fieldMessage.errorMessage}
          disabled={running}
        />
      </div>
      {selectValues.map((values, index) => (
        <div key={index} className={styles.input}>
          <SelectBox
            value={values.value.text}
            setValue={values.setValue}
            error={values.value.errorStatus}
            errorMessage={values.value.errorMessage}
            disabled={running}
            selectLabel={values.label}
            selectItem={values.select}
          />
        </div>
      ))}
      <div className={styles.button}>
        <BasicExecutionButton
          onClick={updateProfile}
          buttonLabel="更新する"
          disabled={running}
        />
      </div>
    </div>
  );
};

export default EditProfileForm;
