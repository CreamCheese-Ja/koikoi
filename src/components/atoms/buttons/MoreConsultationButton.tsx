import { useRecoilState, useRecoilValue } from "recoil";
import {
  consultationListState,
  displayConsulMoreButtonState,
  spinnerState,
  userProfileState,
} from "src/atoms/atom";
import { processingNextConsultationList } from "src/firebase/firestore";
import Spinner from "../progress/Spinner";
import BasicExecutionButton from "./BasicExecutionButton";

const MoreConsultationButton = () => {
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // 恋愛相談Listのstate
  const [consultationList, setConsultationList] = useRecoilState(
    consultationListState
  );

  // スピナーの値
  const [running, setRunning] = useRecoilState(spinnerState);

  // もっと見るボタンの表示、非表示
  const [buttonDisplay, setButtonDisplay] = useRecoilState(
    displayConsulMoreButtonState
  );

  const fetchNextPage = async () => {
    setRunning(true);
    const nextPage = await processingNextConsultationList(
      userProfile.id,
      consultationList[consultationList.length - 1].createdAt
    );
    console.log(nextPage);
    if (typeof nextPage !== "string") {
      setConsultationList([...consultationList, ...nextPage]);
    } else {
      alert("error");
    }

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
