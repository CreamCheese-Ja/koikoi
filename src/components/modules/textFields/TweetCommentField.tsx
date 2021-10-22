import React, { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  tweetCommentCountState,
  tweetCommentListState,
} from "src/atoms/atom";
import MultilineBasicTextField from "src/components/atoms/input/MultilineBasicTextField";
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
  // コメントリストのstate
  const [commentList, setCommentList] = useRecoilState(tweetCommentListState);
  // コメント数の変更関数
  const setTweetCommentCount = useSetRecoilState(tweetCommentCountState);

  const post = async () => {
    setRunning(true);
    if (value.length <= 150) {
      const commentDataId = await createComment(tweetId, userProfile.id, value);
      if (commentDataId) {
        const newCommentData = await getNewCommentData(tweetId, commentDataId);
        if (newCommentData) {
          setCommentList([newCommentData, ...commentList]);
          setTweetCommentCount((count) => count + 1);
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
