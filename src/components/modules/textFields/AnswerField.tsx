import { Dispatch, memo, SetStateAction } from "react";
import BasicButton from "src/components/atoms/buttons/BasicButton";
import MultilineTextFieldWithButton from "src/components/atoms/input/MultilineTextFieldWithButton";
import { useCreateAnswer } from "src/hooks/useCreateAnswer";

type Props = {
  consultationId: string;
  openCloseField: () => void;
  isShowAnswerField: boolean;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const AnswerField = (props: Props) => {
  const {
    consultationId,
    openCloseField,
    isShowAnswerField,
    running,
    setRunning,
  } = props;
  const { answer, setAnswer, postAnswer } = useCreateAnswer(
    consultationId,
    openCloseField,
    setRunning
  );
  return (
    <>
      <div style={{ textAlign: "right" }}>
        <BasicButton
          onClick={openCloseField}
          buttonLabel={isShowAnswerField ? "入力欄を閉じる" : "回答する"}
          variant="text"
        />
      </div>
      {isShowAnswerField ? (
        <div>
          <MultilineTextFieldWithButton
            label="恋愛相談への回答"
            placeholder="内容を入力(1000文字以内)"
            value={answer}
            setValue={setAnswer}
            running={running}
            onClick={postAnswer}
          />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default memo(AnswerField);
