import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageNumberState, userProfileState } from "src/atoms/atom";
import PostListArea from "src/components/block/PostListArea";
import ProfileArea from "src/components/block/ProfileArea";
import { getUserProfile } from "src/firebase/firestore/users/get/getUserProfile";
import { ProfileItem } from "src/type";

type SSRProps = {
  post: ProfileItem;
};

export default function User({ post }: SSRProps) {
  const { id, name } = post;

  const userProfile = useRecoilValue(userProfileState);
  const setPageNumber = useSetRecoilState(pageNumberState);

  useEffect(() => {
    if (userProfile.id === id) {
      setPageNumber(2);
    } else {
      setPageNumber(5);
    }
  }, [userProfile]);

  return (
    <div>
      <Head>
        <title>{name} | 恋々(恋愛相談SNS)</title>
        <meta
          name="description"
          content={`気軽に使える恋愛相談SNS【恋々】のユーザー、【${name}】さんのページ`}
        />
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
