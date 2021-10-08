import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  consultationListState,
  defaultErrorAlertState,
  displayConsulMoreButtonState,
  spinnerState,
  userProfileState,
} from "src/atoms/atom";
import { getNextConsultationList } from "src/firebase/firestore/consultations/get/getNextConsultationList";
import Spinner from "../../atoms/progress/Spinner";
import BasicExecutionButton from "../../atoms/buttons/BasicExecutionButton";

const MoreConsultationButton = () => {
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // 恋愛相談Listのstate
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );

  // 共通エラー用の変更関数
  const setError = useSetRecoilState(defaultErrorAlertState);

  // スピナーのstate
  const [running, setRunning] = useRecoilState(spinnerState);

  // もっと見るボタンの表示、非表示state
  const [buttonDisplay, setButtonDisplay] = useRecoilState(
    displayConsulMoreButtonState
  );

  const fetchNextPage = async () => {
    setRunning(true);
    // 次の10件を取得
    const nextPage = await getNextConsultationList(
      userProfile.id,
      consultationList[consultationList.length - 1].createdAt
    );
    if (typeof nextPage !== "string") {
      setConsultationList([...consultationList, ...nextPage]);
    } else {
      setError(true);
    }
    // 取得数が10未満であればボタンを非表示にする
    if (nextPage.length !== 10) {
      setButtonDisplay(false);
    }
    setRunning(false);
  };

  return (
    <>
      {running ? (
        <Spinner />
      ) : buttonDisplay ? (
        <BasicExecutionButton
          onClick={fetchNextPage}
          buttonLabel="もっと見る"
          disabled={running}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default MoreConsultationButton;
