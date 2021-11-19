import { Dispatch, SetStateAction } from "react";
import { useSetRecoilState } from "recoil";
import {
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
} from "src/atoms/atom";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
import { loginEmailAndPassword } from "src/firebase/authentication/loginEmailAndPassword";

type Props = {
  openAndCloseDialog: () => void;
  running: boolean;
  setRunning: Dispatch<SetStateAction<boolean>>;
};

const GuestLoginForm = (props: Props) => {
  const { openAndCloseDialog, running, setRunning } = props;

  // 共通のエラー、サクセスアラートの変更関数
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  // ゲストログイン処理
  const guestLogin = async (email: string, password: string) => {
    setRunning(true);
    // ログイン処理
    const loginResult = await loginEmailAndPassword(email, password);
    if (loginResult === true) {
      setSuccess({ status: true, message: "ログインしました。" });
      openAndCloseDialog();
    } else {
      setError({ status: true, message: "エラーが発生しました。" });
    }
    setRunning(false);
  };

  const cautionMessage = [
    "恋愛相談、つぶやきは、回答、コメント、いいねが無い場合のみ削除できます。",
    "恋愛相談の回答、つぶやきに対してのコメントは現在削除できません。",
    "ゲストユーザーでの投稿は、投稿から12h経過後に削除いたしますので、ご自由にご操作ください。",
  ];

  return (
    <>
      <div>
        <p style={{ fontSize: "1rem", color: "red" }}>注意事項</p>
        <ul>
          {cautionMessage.map((item, index) => (
            <li style={{ listStyle: "initial" }} key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ margin: "20px 0" }}>
          <ExecutionButton
            onClick={() =>
              guestLogin("test.chisatoshiraga@gmail.com", "guest1@koikoi")
            }
            buttonLabel="ユーザー1"
            disabled={running}
          />
        </div>
        <div>
          <ExecutionButton
            onClick={() =>
              guestLogin(
                "test.chisatoshiraga+guest2@gmail.com",
                "guest2@koikoi"
              )
            }
            buttonLabel="ユーザー2"
            disabled={running}
          />
        </div>
      </div>
    </>
  );
};

export default GuestLoginForm;
