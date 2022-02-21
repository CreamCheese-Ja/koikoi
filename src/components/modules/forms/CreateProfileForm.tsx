import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
import BasicTextField from "src/components/atoms/input/BasicTextField";
import { getIsNameAvailable } from "src/firebase/firestore/users/get/getIsNameAvailable";
import firebase from "src/firebase/firebase";
import { useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  userProfileState,
} from "src/atoms/atom";
import { createNewProfile } from "src/firebase/firestore/users/write/createNewProfile";
import { getUserProfile } from "src/firebase/firestore/users/get/getUserProfile";

type Props = {
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  toggleDialog: () => void;
};

const CreateProfileForm = (props: Props) => {
  const { running, setRunning, toggleDialog } = props;

  const [name, setName] = useState("");
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 共通のエラーアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  // 共通のサクセスアラートの変更関数
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // ユーザープロフィール用の変更関数
  const setUserProfile = useSetRecoilState(userProfileState);

  // inputErrorの表示
  const showErrorMessage = (message: string) => {
    setInputError(true);
    setErrorMessage(message);
    setRunning(false);
  };

  // プロフィール作成
  const createProfile = async () => {
    setRunning(true);

    // ユーザー名の存在確認
    const isNameAvailable = await getIsNameAvailable(name);
    if (isNameAvailable) {
      showErrorMessage("このユーザー名は使用されています。");
      setRunning(false);
      return;
    }

    // ユーザーがログイン済みか確認
    const userId = firebase.auth().currentUser?.uid;
    if (!userId) {
      setError({ status: true, message: "ログインされていません。" });
      setRunning(false);
      return;
    }

    // プロフィール作成
    const isCreateNewProfile = await createNewProfile(userId, name);
    if (!isCreateNewProfile) {
      setError({ status: true, message: "エラーが発生しました。" });
      setRunning(false);
      return;
    }

    // プロフィール情報取得
    const profileData = await getUserProfile(userId);
    if (!profileData) {
      setError({
        status: true,
        message: "プロフィール情報を取得できませんでした。",
      });
      setRunning(false);
      return;
    }
    setUserProfile(profileData);

    setSuccess({ status: true, message: "プロフィールを作成しました。" });
    setRunning(false);
    toggleDialog();
  };

  useEffect(() => {
    if (inputError) {
      setInputError(false);
      setErrorMessage("");
    }
  }, [name]);

  return (
    <>
      <p style={{ marginBottom: "10px" }}>
        アプリ内で使用するユーザー名を決めてください。
      </p>
      <div style={{ textAlign: "center" }}>
        <BasicTextField
          label="ユーザー名"
          type="text"
          value={name}
          setValue={setName}
          error={inputError}
          errorMessage={errorMessage}
          disabled={running}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <ExecutionButton
          onClick={createProfile}
          buttonLabel="決定する"
          disabled={running || !name || name.length > 20}
        />
      </div>
    </>
  );
};

export default CreateProfileForm;
