import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageNumberState, userProfileState } from "src/atoms/atom";
import UserPostListArea from "src/components/block/UserPostListArea";
import UserProfileArea from "src/components/block/UserProfileArea";
import { getUserProfile } from "src/firebase/firestore/users/get/getUserProfile";
import { ProfileItem } from "src/type";
import Error from "next/error";
import useMedia from "use-media";

type ISGProps = {
  post: ProfileItem | null;
};

export default function User({ post }: ISGProps) {
  const { id, name } = post || {};
  const isWide = useMedia({ minWidth: 801 });

  const [profileData, setProfileData] = useState<ProfileItem | null>(null);

  const userProfile = useRecoilValue(userProfileState);
  const setPageNumber = useSetRecoilState(pageNumberState);

  useEffect(() => {
    if (userProfile.id === id) {
      setPageNumber(2);
    } else {
      setPageNumber(5);
    }
  }, [userProfile]);

  useEffect(() => {
    (async () => {
      if (id) {
        const profileData = await getUserProfile(id);
        if (profileData) {
          setProfileData(profileData);
        }
      }
    })();
  }, []);

  // 変更がない値はISGのデータを渡し、変更がある値はCSRのfetchデータを渡す
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
            {profileData ? (
              <UserProfileArea userData={profileData} />
            ) : (
              <div
                style={{
                  height: isWide ? "390px" : "465px",
                  backgroundColor: "#fff",
                  marginBottom: "20px",
                }}
              ></div>
            )}
            <UserPostListArea pageId={id} />
          </>
        ) : (
          <Error statusCode={404} />
        )}
      </div>
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
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ISGProps> = async (
  context: GetStaticPropsContext
) => {
  const params = context.params as ISGParams;
  const postId = params.id;
  const post = await getUserProfile(postId);
  return {
    props: {
      post,
    },
  };
};
