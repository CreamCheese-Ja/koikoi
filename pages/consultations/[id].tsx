import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pageNumberState, userProfileState } from "src/atoms/atom";
import AnswerArea from "src/components/block/AnswerArea";
import { ConsultationDetails } from "src/type";
import BestAnswerArea from "src/components/block/BestAnswerArea";
import { getConsultationDetails } from "src/firebase/firestore/consultations/get/getConsultationDetails";
import ConsultationDetailArea from "src/components/block/ConsultationDetailArea";
import { useEffect } from "react";

type SSRProps = {
  post: ConsultationDetails;
};

export default function Consultation({ post }: SSRProps) {
  const { user, consultationId, title, content, solution } = post;

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  const setPageNumber = useSetRecoilState(pageNumberState);

  useEffect(() => {
    setPageNumber(0);
  }, []);

  return (
    <div>
      <Head>
        <title>{title} | 恋々(恋愛相談SNS)</title>
        <meta name="description" content={content} />
      </Head>
      <ConsultationDetailArea post={post} userProfile={userProfile} />
      <BestAnswerArea
        consulId={consultationId}
        solution={solution}
        userProfile={userProfile}
      />

      <AnswerArea consultationId={consultationId} consulUserId={user.id} />
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

  const post = await getConsultationDetails(postId);
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
