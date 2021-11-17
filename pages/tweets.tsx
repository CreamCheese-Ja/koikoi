import Head from "next/head";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { pageNumberState } from "src/atoms/atom";
import ExecutionButton from "src/components/atoms/buttons/ExecutionButton";
import Spinner from "src/components/atoms/progress/Spinner";
import TweetListArea from "src/components/block/TweetListArea";
import { useGetNextTweetList } from "src/hooks/useGetNextTweetList";
import styles from "../styles/postListPage.module.css";

const Tweets = () => {
  const setPageNumber = useSetRecoilState(pageNumberState);
  const { running, setRunning, showMoreButton, tweetList, fetchNextPage } =
    useGetNextTweetList();

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
          <TweetListArea setRunning={setRunning} />
        </div>
        <div className={styles.nextButton}>
          {running ? (
            <Spinner />
          ) : showMoreButton && tweetList.length >= 10 ? (
            <ExecutionButton
              onClick={fetchNextPage}
              buttonLabel="もっと見る"
              disabled={running}
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tweets;
