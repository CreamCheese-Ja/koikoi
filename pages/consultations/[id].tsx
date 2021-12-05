import {
  GetStaticPaths,
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next";
import Head from "next/head";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageNumberState, userProfileState } from "src/atoms/atom";
import AnswerArea from "src/components/block/AnswerArea";
import { ConsultationDetails } from "src/type";
import BestAnswerArea from "src/components/block/BestAnswerArea";
import { getConsultationDetails } from "src/firebase/firestore/consultations/get/getConsultationDetails";
import ConsultationDetailArea from "src/components/block/ConsultationDetailArea";
import { useEffect, useState } from "react";
import Error from "next/error";

type ISGProps = {
  post: ConsultationDetails | null;
};

export default function Consultation({ post }: ISGProps) {
  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  const [consulData, setConsulData] = useState<ConsultationDetails | null>(
    null
  );

  const setPageNumber = useSetRecoilState(pageNumberState);

  useEffect(() => {
    setPageNumber(0);
  }, []);

  useEffect(() => {
    (async () => {
      if (post) {
        const tweetData = await getConsultationDetails(post.consultationId);
        if (tweetData) {
          setConsulData(tweetData);
        }
      }
    })();
  }, []);

  // 変更がない値はISGのデータを渡し、変更がある値はCSRのfetchデータを渡す
  return (
    <div>
      <Head>
        <title>{post ? post.title : ""} | 恋々(恋愛相談SNS)</title>
        <meta name="description" content={post ? post.content : ""} />
      </Head>
      {post ? (
        <>
          <ConsultationDetailArea
            post={
              consulData
                ? {
                    ...post,
                    user: consulData.user,
                    solution: consulData.solution,
                    supplement: consulData.supplement,
                    supplementCreatedAt: consulData.supplementCreatedAt,
                    numberOfAnswer: consulData.numberOfAnswer,
                    numberOfLikes: consulData.numberOfLikes,
                  }
                : post
            }
            userProfile={userProfile}
            consulDataState={consulData}
          />
          {consulData ? (
            <>
              <BestAnswerArea
                consulId={consulData.consultationId}
                solution={consulData.solution}
                userProfile={userProfile}
              />
              <AnswerArea
                consultationId={consulData.consultationId}
                consulUserId={consulData.user.id}
              />
            </>
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
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ISGProps> = async (
  context: GetStaticPropsContext
) => {
  const params = context.params as ISGParams;
  const postId = params.id;
  const post = await getConsultationDetails(postId);

  return {
    props: {
      post,
    },
  };
};
