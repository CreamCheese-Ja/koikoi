import React, { useState } from "react";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import {
  showAnswerReplyFieldState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import { writeAnswerComment } from "src/firebase/firestore/consultations/write/writeAnswerComment";
import { AnswerList, ProfileItem } from "src/type";
import MultilineBasicTextField from "../../atoms/textFields/MultilineBasicTextField";

type Props = {
  userProfile: ProfileItem;
  consulId: string;
  answerId: string;
  consulUserId: string;
  answerList: AnswerList;
  setAnswerList: SetterOrUpdater<AnswerList>;
};
const AnswerCommentField = (props: Props) => {
  const [value, setValue] = useState("");
  const [running, setRunning] = useState(false);

  // 回答への返信フィールド表示のstate
  const [showAnswerReplyField, setShowAnswerReplyField] = useRecoilState(
    showAnswerReplyFieldState
  );
  // アラート系state
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // 返信を登録する
  const post = async () => {
    setRunning((running) => !running);
    // 恋愛相談者と返信者が同じであること、500文字以内であることを確認
    if (props.consulUserId === props.userProfile.id && value.length <= 500) {
      const postMessage = await writeAnswerComment(
        props.consulId,
        props.answerId,
        value
      );
      if (postMessage !== "error") {
        // 成功
        // answerリストにコメントを追加(日時を表示させないため、commentCreatedAtには1度nullを入れる)
        const newAnswerList = props.answerList.map((data) => {
          if (data.answerId === props.answerId) {
            return { ...data, comment: value, commentCreatedAt: null };
          } else {
            return data;
          }
        });
        props.setAnswerList(newAnswerList);
        setValue("");
        setShowAnswerReplyField(false);
        setSuccess({ status: true, message: postMessage });
      } else {
        // 失敗
        setError({ status: true, message: "エラーが発生しました。" });
      }
    } else if (value.length > 500) {
      setError({ status: true, message: "補足は500文字以内です。" });
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
    }
    setRunning((running) => !running);
  };

  return (
    <>
      {showAnswerReplyField ? (
        <div>
          <MultilineBasicTextField
            label="コメント"
            placeholder="回答への返信コメントを入力してください(500文字以内)"
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

export default AnswerCommentField;
