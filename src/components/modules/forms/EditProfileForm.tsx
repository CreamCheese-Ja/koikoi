import { Dispatch, SetStateAction } from "react";
import { useEditProfile } from "src/hooks/useEditProfile";
import MultilineTextField from "src/components/atoms/input/MultilineTextField";
import SelectBox from "src/components/atoms/input/SelectBox";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
import InputImage from "src/components/modules/others/InputImage";

type Props = {
  message: string;
  gender: string;
  age: string;
  job: string;
  bloodType: string;
  sign: string;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

const EditProfileForm = (props: Props) => {
  const {
    message,
    gender,
    age,
    job,
    bloodType,
    sign,
    running,
    setRunning,
    setIsDialogOpen,
  } = props;

  const {
    userProfile,
    croppedImage,
    setCroppedImage,
    fieldMessage,
    setFieldMessage,
    selectValues,
    updateProfile,
  } = useEditProfile(
    message,
    gender,
    age,
    job,
    bloodType,
    sign,
    setRunning,
    setIsDialogOpen
  );

  const inputStyle = { margin: "20px 0" };
  const buttonAreaStyle: { [key: string]: string } = { textAlign: "center" };

  return (
    <div>
      <div>
        <InputImage
          photoURL={userProfile.photoURL}
          croppedImage={croppedImage}
          setCroppedImage={setCroppedImage}
        />
      </div>
      <div style={inputStyle}>
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
        <div key={index} style={inputStyle}>
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
      <div style={buttonAreaStyle}>
        <ExecutionButton
          onClick={updateProfile}
          buttonLabel="更新する"
          disabled={running}
        />
      </div>
    </div>
  );
};

export default EditProfileForm;
