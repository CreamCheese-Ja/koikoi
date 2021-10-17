import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import PostListArea from "src/components/block/PostListArea";
import ProfileArea from "src/components/block/ProfileArea";
import { getUserProfile } from "src/firebase/firestore/users/get/getUserProfile";
import { ProfileItem } from "src/type";

type SSRProps = {
  post: ProfileItem;
};

export default function User({ post }: SSRProps) {
  const { id, name } = post;

  return (
    <div>
      <Head>
        <title>{name} | 恋々(恋愛相談SNS)</title>
      </Head>
      <div>
        <ProfileArea userData={post} />
        <PostListArea userId={id} />
      </div>
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

  const post = await getUserProfile(postId);
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
