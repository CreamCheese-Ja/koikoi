import Head from "next/head";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageNumberState } from "src/atoms/atom";
import TweetListArea from "src/components/block/TweetListArea";
import MoreTweetButton from "src/components/modules/buttons/MoreTweetButton";
import styles from "../styles/postListPage.module.css";

const Tweets = () => {
  const setPageNumber = useSetRecoilState(pageNumberState);

  useEffect(() => {
    setPageNumber(1);
  }, []);

  return (
    <div>
      <Head>
        <title>つぶやき一覧 | 恋々</title>
        <meta
          name="description"
          content="気軽に使える恋愛相談SNS【恋々】のつぶやき一覧ページ"
        />
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

export default Tweets;
