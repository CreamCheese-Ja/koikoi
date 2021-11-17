import React, { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  displaySupplementFieldState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  Supplements,
  supplementsState,
  userProfileState,
} from "src/atoms/atom";
import { writeSupplement } from "src/firebase/firestore/consultations/write/writeSupplement";
import MultilineTextFieldWithButton from "../../atoms/input/MultilineTextFieldWithButton";

type Props = {
  userId: string;
  docId: string;
};

const SupplementField = (props: Props) => {
  const { userId, docId } = props;
  const [value, setValue] = useState("");

  // 補足入力フィールド表示のstate
  const [displaySupplementField, setDisplaySupplementField] = useRecoilState(
    displaySupplementFieldState
  );

  // 補足オブジェクトのstate
  const [supplements, setSupplements] = useRecoilState(supplementsState);

  const [running, setRunning] = useState(false);

  // アラート系state
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  const post = async () => {
    setRunning(true);
    // 恋愛相談の作成者と補足の追加者が同じこと、500文字以内であることを確認
    if (userId === userProfile.id && value.length <= 500) {
      const postResult = await writeSupplement(docId, value);
      if (postResult) {
        // 成功
        const id: keyof Supplements = docId;
        setSupplements({ ...supplements, [id]: value });
        setValue("");
        setDisplaySupplementField(false);
        setSuccess({ status: true, message: "補足を追加しました。" });
      } else {
        // 失敗
        setError({ status: true, message: "エラーが発生しました。" });
      }
    } else if (value.length > 500) {
      // 500文字以内のアラート
      setError({ status: true, message: "補足は500文字以内です。" });
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
    }
    setRunning(false);
  };

  return (
    <>
      {displaySupplementField ? (
        <div>
          <MultilineTextFieldWithButton
            label="恋愛相談の補足"
            placeholder="内容を入力してください(500文字以内)"
            value={value}
            setValue={setValue}
            running={running}
            onClick={post}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default SupplementField;
