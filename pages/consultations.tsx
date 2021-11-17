import Head from "next/head";
import styles from "../styles/postListPage.module.css";
import ConsultationListArea from "src/components/block/ConsultationListArea";
import { useSetRecoilState } from "recoil";
import { pageNumberState } from "src/atoms/atom";
import { useEffect } from "react";
import { useGetNextConsulList } from "src/hooks/useGetNextConsulList";
import Spinner from "src/components/atoms/progress/Spinner";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";

const Consultations = () => {
  const setPageNumber = useSetRecoilState(pageNumberState);
  const {
    running,
    setRunning,
    buttonDisplay,
    consultationList,
    fetchNextPage,
  } = useGetNextConsulList();

  useEffect(() => {
    setPageNumber(0);
  }, []);

  return (
    <div>
      <Head>
        <title>恋愛相談一覧 | 恋々</title>
        <meta
          name="description"
          content="気軽に使える恋愛相談SNS【恋々】の恋愛相談一覧ページ"
        />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>恋愛相談</h1>
        <div>
          <ConsultationListArea setRunning={setRunning} />
        </div>
        <div className={styles.nextButton}>
          {running ? (
            <Spinner />
          ) : buttonDisplay && consultationList.length >= 10 ? (
            <ExecutionButton
              onClick={fetchNextPage}
              buttonLabel="もっと見る"
              disabled={running}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Consultations;
