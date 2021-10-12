import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  tweetCommentListState,
} from "src/atoms/atom";
import MultilineBasicTextField from "src/components/atoms/textFields/MultilineBasicTextField";
import { getNewCommentData } from "src/firebase/firestore/tweets/get/getNewCommentData";
import { createComment } from "src/firebase/firestore/tweets/write/createComment";
import { ProfileItem } from "src/type";

type Props = {
  isShowField: boolean;
  tweetId: string;
  userProfile: ProfileItem;
};

const TweetCommentField = (props: Props) => {
  const { isShowField, tweetId, userProfile } = props;
  const [value, setValue] = useState("");
  const [running, setRunning] = useState(false);

  // アラート系stateの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);
  // コメントリストの変更関数
  const [commentList, setCommentList] = useRecoilState(tweetCommentListState);

  const post = async () => {
    setRunning(true);
    if (value.length <= 150) {
      const commentDataId = await createComment(tweetId, userProfile.id, value);
      if (typeof commentDataId === "string") {
        const newCommentData = await getNewCommentData(tweetId, commentDataId);
        if (newCommentData) {
          setCommentList([newCommentData, ...commentList]);
          setValue("");
          setSuccess({ status: true, message: "コメントしました。" });
        } else {
          setError({ status: true, message: "エラーが発生しました。" });
        }
      } else {
        setError({ status: true, message: "エラーが発生しました。" });
      }
    } else {
      // 150文字以内のアラート
      setError({ status: true, message: "コメントは150文字以内です。" });
    }
    setRunning(false);
  };

  return (
    <>
      {isShowField ? (
        <div>
          <MultilineBasicTextField
            label="コメント"
            placeholder="つぶやきへのコメントを入力してください(150文字以内)"
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

export default TweetCommentField;
