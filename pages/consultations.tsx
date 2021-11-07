import Head from "next/head";
import MoreConsultationButton from "src/components/modules/buttons/MoreConsultationButton";
import styles from "../styles/postListPage.module.css";
import ConsultationListArea from "src/components/block/ConsultationListArea";
import { useSetRecoilState } from "recoil";
import { pageNumberState } from "src/atoms/atom";
import { useEffect } from "react";

const Consultations = () => {
  const setPageNumber = useSetRecoilState(pageNumberState);

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
          <ConsultationListArea />
        </div>
        <div className={styles.nextButton}>
          <MoreConsultationButton />
        </div>
      </div>
    </div>
  );
};

export default Consultations;
