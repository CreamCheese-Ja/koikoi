import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Head from "next/head";
import { getTweetDetails } from "src/firebase/firestore/tweets/get/getTweetDetails";
import { TweetData, TweetDetails } from "src/type";
import TweetDetailArea from "src/components/block/TweetDetailArea";
import TweetCommentArea from "src/components/block/TweetCommentArea";
import { useSetRecoilState } from "recoil";
import { pageNumberState } from "src/atoms/atom";
import { useEffect, useState } from "react";
import Error from "next/error";
import { getNewTweetData } from "src/firebase/firestore/tweets/get/getNewTweetData";

type ISGProps = {
  post: TweetDetails | null;
};

export default function Tweet({ post }: ISGProps) {
  const setPageNumber = useSetRecoilState(pageNumberState);
  const [tweetData, setTweetData] = useState<TweetData | null>(null);

  useEffect(() => {
    setPageNumber(1);
  }, []);

  useEffect(() => {
    (async () => {
      if (post) {
        const tweetData = await getNewTweetData(post.tweetId);
        if (tweetData) {
          setTweetData(tweetData);
        }
      }
    })();
  }, []);

  // 変更がない値はISGのデータを渡し、変更がある値はfetchデータを渡す
  return (
    <div>
      <Head>
        <title>
          {post && post.content.length <= 20
            ? post.content
            : post?.content?.slice(0, 20) + "..."}{" "}
          | 恋々(恋愛相談SNS)
        </title>
        <meta name="description" content={post?.content} />
      </Head>
      {post ? (
        <>
          <TweetDetailArea
            user={tweetData?.user}
            tweetId={post.tweetId}
            category={post.category}
            content={post.content}
            numberOfLikes={tweetData ? tweetData.numberOfLikes : 0}
            createdAt={post.createdAt}
          />
          {tweetData ? (
            <TweetCommentArea
              tweetId={post.tweetId}
              numberOfComments={tweetData.numberOfComments}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <Error statusCode={404} />
      )}
    </div>
  );
}

type ISGParams = {
  id: string;
};

export const getStaticPaths: GetStaticPaths<ISGParams> = (
  _context: GetStaticPathsContext
) => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ISGProps> = async (
  context: GetStaticPropsContext
) => {
  const params = context.params as ISGParams;
  const postId = params.id;
  const post = await getTweetDetails(postId);

  return {
    props: {
      post,
    },
  };
};
