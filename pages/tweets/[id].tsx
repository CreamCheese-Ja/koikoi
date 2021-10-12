import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { getTweetDetails } from "src/firebase/firestore/tweets/get/getTweetDetails";
import { TweetDetails } from "src/type";
import TweetDetailArea from "src/components/block/TweetDetailArea";

type SSRProps = {
  post: TweetDetails;
};

export default function Tweet({ post }: SSRProps) {
  const {
    user,
    tweetId,
    category,
    content,
    numberOfLikes,
    numberOfComments,
    createdAt,
  } = post;

  return (
    <div>
      <Head>
        <title>
          {content.length <= 20 ? content : content.slice(0, 20) + "..."} |
          恋々(恋愛相談SNS)
        </title>
      </Head>
      <TweetDetailArea
        user={user}
        tweetId={tweetId}
        category={category}
        content={content}
        numberOfLikes={numberOfLikes}
        createdAt={createdAt}
      />
    </div>
  );
}

type SSRParams = {
  id: string;
};

export const getServerSideProps: GetServerSideProps<SSRProps> = async (
  context: GetServerSidePropsContext
) => {
  const params = context.params as SSRParams;
  const postId = params.id;

  const post = await getTweetDetails(postId);
  if (post) {
    return {
      props: {
        post,
      },
    };
  } else {
    return {
      notFound: true,
    };
  }
};
