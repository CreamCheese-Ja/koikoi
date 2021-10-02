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
import { postSupplement } from "src/firebase/firestore";
import MultilineBasicTextField from "./MultilineBasicTextField";

type Props = {
  userId: string;
  docId: string;
};

const SupplementField = (props: Props) => {
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
    setRunning((running) => !running);
    // 恋愛相談の作成者と補足の追加者が同じこと、500文字以内であることを確認
    if (props.userId === userProfile.id && value.length <= 500) {
      const postData = await postSupplement(props.docId, value);
      if (postData !== "error") {
        // 成功
        const docId: keyof Supplements = props.docId;
        setSupplements({ ...supplements, [docId]: value });
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
    setRunning((running) => !running);
  };

  return (
    <>
      {displaySupplementField ? (
        <div>
          <MultilineBasicTextField
            label="補足"
            placeholder="恋愛相談の補足があれば入力してください(500文字以内)"
            value={value}
            setValue={setValue}
            running={running}
            post={post}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default SupplementField;
