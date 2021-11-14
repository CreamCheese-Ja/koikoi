import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageNumberState, userProfileState } from "src/atoms/atom";
import PostListArea from "src/components/block/PostListArea";
import ProfileArea from "src/components/block/ProfileArea";
import { getUserProfile } from "src/firebase/firestore/users/get/getUserProfile";
import { ProfileItem } from "src/type";
import Error from "next/error";

type ISRProps = {
  post: ProfileItem | null;
};

export default function User({ post }: ISRProps) {
  const { id, name } = post || {};

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
        {post && id ? (
          <>
            <ProfileArea userData={post} />
            <PostListArea userId={id} />
          </>
        ) : (
          <Error statusCode={404} />
        )}
      </div>
    </div>
  );
}

type ISRParams = {
  id: string;
};

export const getStaticPaths: GetStaticPaths<ISRParams> = (
  _context: GetStaticPathsContext
) => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ISRProps> = async (
  context: GetStaticPropsContext
) => {
  const params = context.params as ISRParams;
  const postId = params.id;
  const post = await getUserProfile(postId);

  return {
    props: {
      post,
    },
    revalidate: 20,
  };
};
