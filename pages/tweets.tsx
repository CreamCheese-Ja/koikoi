import Head from "next/head";
import TweetListArea from "src/components/block/TweetListArea";
import MoreTweetButton from "src/components/modules/buttons/MoreTweetButton";
import styles from "../styles/Home.module.css";

const tweets = () => {
  return (
    <div>
      <Head>
        <title>つぶやき一覧 | 恋々</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>つぶやき</h1>
        <div>
          <TweetListArea />
        </div>
        <div className={styles.nextButton}>
          <MoreTweetButton />
        </div>
      </div>
    </div>
  );
};

export default tweets;
