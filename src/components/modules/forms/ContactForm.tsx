import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import { sendMessageToSlack } from "src/common/sendMessageToSlack";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
import BasicTextField from "src/components/atoms/input/BasicTextField";
import MultilineTextField from "src/components/atoms/input/MultilineTextField";
import firebase from "src/firebase/firebase";

type Props = {
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
  openCloseDialog: () => void;
};

const ContactForm = (props: Props) => {
  const { running, setRunning, openCloseDialog } = props;

  const [email, setEmail] = useState("");
  const [content, setContent] = useState({
    text: "",
    errorStatus: false,
    errorMessage: "",
  });
  const [inputError, setInputError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // それぞれの入力欄のエラーをリセット
  useEffect(() => {
    setInputError(false);
    setErrorMessage("");
  }, [email]);

  useEffect(() => {
    setContent((content) => ({
      ...content,
      errorStatus: false,
      errorMessage: "",
    }));
  }, [content.text]);

  const emailReg =
    /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}$/;

  // お問い合わせ内容を送信
  const sendMessage = async () => {
    setRunning(true);

    const user = firebase.auth().currentUser;
    const sendEmail = user?.email ? user.email + "(会員)" : email + "(非会員)";

    // メールアドレスの形式チェック
    if (!user && !emailReg.test(email)) {
      setInputError(true);
      setErrorMessage("正しい形式で入力してください。");
      setRunning(false);
      return;
    }

    const sendResult = await sendMessageToSlack(sendEmail, content.text);
    if (sendResult) {
      setSuccess({ status: true, message: "送信しました。" });
      openCloseDialog();
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
    }

    setRunning(false);
  };

  return (
    <>
      {firebase.auth().currentUser ? (
        <></>
      ) : (
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <BasicTextField
            label="メールアドレス"
            type="email"
            value={email}
            setValue={setEmail}
            error={inputError}
            errorMessage={errorMessage}
            disabled={running}
          />
        </div>
      )}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <MultilineTextField
          label="内容"
          value={content.text}
          setValue={setContent}
          error={content.errorStatus}
          errorMessage={content.errorMessage}
          disabled={running}
          rows={5}
        />
      </div>
      <div style={{ textAlign: "center" }}>
        <ExecutionButton
          buttonLabel="送信する"
          disabled={
            firebase.auth().currentUser
              ? running || !content.text
              : running || !email || !content.text
          }
          onClick={sendMessage}
        />
      </div>
    </>
  );
};

export default ContactForm;
