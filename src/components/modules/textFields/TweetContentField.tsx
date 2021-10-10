import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { tweetContentState } from "src/atoms/atom";
import MultilineTextField from "src/components/atoms/textFields/MultilineTextField";

type Props = {
  running: boolean;
};

const TweetContentField = (props: Props) => {
  const { running } = props;
  const [content, setContent] = useRecoilState(tweetContentState);

  useEffect(() => {
    setContent((content) => ({
      ...content,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [content.text]);

  return (
    <>
      <MultilineTextField
        label="内容"
        value={content.text}
        setValue={setContent}
        error={content.errorStatus}
        errorMessage={content.errorMessage}
        disabled={running}
      />
    </>
  );
};

export default TweetContentField;
