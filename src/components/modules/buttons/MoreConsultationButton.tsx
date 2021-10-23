import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  consultationListState,
  displayConsulMoreButtonState,
  multipurposeErrorAlertState,
  spinnerState,
  userProfileState,
} from "src/atoms/atom";
import { getNextConsultationList } from "src/firebase/firestore/consultations/get/getNextConsultationList";
import Spinner from "../../atoms/progress/Spinner";
import ExecutionButton from "../../atoms/buttons/ExecutionButton";

const MoreConsultationButton = () => {
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // 恋愛相談Listのstate
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );

  // エラーstate
  const setError = useSetRecoilState(multipurposeErrorAlertState);

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
    if (nextPage) {
      setConsultationList([...consultationList, ...nextPage]);
    } else {
      setError({ status: true, message: "ページを取得できませんでした。" });
    }
    // 取得数が10未満であればボタンを非表示にする
    if (nextPage?.length !== 10) {
      setButtonDisplay(false);
    }
    setRunning(false);
  };

  return (
    <>
      {running ? (
        <Spinner />
      ) : buttonDisplay ? (
        <ExecutionButton
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
