import React, { useState } from "react";
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from "recoil";
import {
  showAnswerReplyFieldState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import { writeAnswerComment } from "src/firebase/firestore/consultations/write/writeAnswerComment";
import { AnswerList, ProfileItem } from "src/type";
import MultilineTextFieldWithButton from "../../atoms/input/MultilineTextFieldWithButton";

type Props = {
  userProfile: ProfileItem;
  consulId: string;
  answerId: string;
  consulUserId: string;
  answerList: AnswerList;
  setAnswerList: SetterOrUpdater<AnswerList>;
};
const AnswerCommentField = (props: Props) => {
  const {
    userProfile,
    consulId,
    answerId,
    consulUserId,
    answerList,
    setAnswerList,
  } = props;

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
    setRunning(true);
    // 恋愛相談者と返信者が同じであること、500文字以内であることを確認
    if (consulUserId === userProfile.id && value.length <= 500) {
      const postResult = await writeAnswerComment(consulId, answerId, value);
      if (postResult) {
        // 成功
        // answerリストにコメントを追加(日時を表示させないため、commentCreatedAtには1度nullを入れる)
        const newAnswerList = answerList.map((data) => {
          if (data.answerId === answerId) {
            return { ...data, comment: value, commentCreatedAt: null };
          } else {
            return data;
          }
        });
        setAnswerList(newAnswerList);
        setValue("");
        setShowAnswerReplyField(false);
        setSuccess({ status: true, message: "回答に返信しました。" });
      } else {
        // 失敗
        setError({ status: true, message: "エラーが発生しました。" });
      }
    } else if (value.length > 500) {
      setError({ status: true, message: "補足は500文字以内です。" });
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
    }
    setRunning(false);
  };

  return (
    <>
      {showAnswerReplyField ? (
        <div>
          <MultilineTextFieldWithButton
            label="回答への返信コメント"
            placeholder="内容を入力(500文字以内)"
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

export default AnswerCommentField;
