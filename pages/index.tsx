import Head from "next/head";
import Image from "next/image";
import MoreConsultationButton from "src/components/modules/buttons/MoreConsultationButton";
import AllConsultationArea from "src/components/block/AllConsultationArea";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>恋々 | 恋愛相談SNS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>恋愛相談</h1>
        <div>
          <AllConsultationArea />
        </div>
        <div className={styles.nextButton}>
          <MoreConsultationButton />
        </div>
      </div>
    </div>
  );
}
