import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import Head from "next/head";
import { getConsultationDetails } from "src/firebase/firestore";
import styles from "styles/consultation.module.css";
import Divider from "@material-ui/core/Divider";
import { consulCategory } from "src/components/block/ConsultationArea";
import AnswerButton from "src/components/atoms/buttons/AnswerButton";
import { useRecoilValue } from "recoil";
import { supplementsState, userProfileState } from "src/atoms/atom";
import SupplementButton from "src/components/atoms/buttons/SupplementButton";
import SupplementField from "src/components/atoms/textFields/SupplementField";
import ConsulDetailLike from "src/components/atoms/others/ConsulDetailLike";
import SupplementArea from "src/components/atoms/SupplementArea";
import NumberOfAnswer from "src/components/atoms/others/NumberOfAnswer";
import AnswerArea from "src/components/block/AnswerArea";
import { ConsultationDetails } from "src/type";
import Solution from "src/components/atoms/others/Solution";
import BestAnswerArea from "src/components/block/BestAnswerArea";

interface SSRProps {
  post: ConsultationDetails;
}

export default function Consultation({ post }: SSRProps) {
  const {
    user,
    consultationId,
    category,
    title,
    content,
    supplement,
    solution,
    numberOfLikes,
    numberOfAnswer,
    createdAt,
    supplementCreatedAt,
  } = post;

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  // 補足stateの値
  const supplements = useRecoilValue(supplementsState);

  return (
    <div>
      <Head>
        <title>{title} | 恋愛相談SNS</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.dateAndUserArea}>
          <div className={styles.userArea}>
            {user.photoURL === "noImage" ? (
              <Image src={noProfile} width={30} height={30} />
            ) : (
              <Image src={user.photoURL} width={30} height={30} />
            )}
            <div className={styles.name}>{user.name}</div>
          </div>
          <div>{createdAt}に投稿</div>
        </div>
        <div className={styles.titleAndAnswer}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.answerArea}>
            <NumberOfAnswer initialNumberOfAnswer={numberOfAnswer} />
          </div>
        </div>
        <div className={styles.categoryAndSolution}>
          <div className={styles.category}>{consulCategory(category)}</div>
          <Solution solution={solution} />
        </div>
        <Divider />
        <div className={styles.content}>{content}</div>
        <div className={styles.likeAndSupplementArea}>
          <div className={styles.likeButtonArea}>
            <ConsulDetailLike
              numberOfLikes={numberOfLikes}
              consultationId={consultationId}
              userId={user.id}
            />
          </div>
          {user.id === userProfile.id &&
          supplement === "" &&
          !(consultationId in supplements) ? (
            <div>
              <SupplementButton />
            </div>
          ) : (
            <div></div>
          )}
        </div>
        {user.id === userProfile.id && supplement === "" ? (
          <div>
            <SupplementField userId={user.id} docId={consultationId} />
          </div>
        ) : (
          <div></div>
        )}
        <SupplementArea
          supplement={supplement}
          consulId={consultationId}
          supplementCreatedAt={supplementCreatedAt}
        />
        <Divider />
        {solution || userProfile.id === user.id ? (
          <div></div>
        ) : (
          <div className={styles.answerButtonArea}>
            <AnswerButton consultationId={consultationId} />
          </div>
        )}
      </div>
      <BestAnswerArea
        consulId={consultationId}
        solution={solution}
        userProfile={userProfile}
      />
      <div className={styles.container}>
        <AnswerArea consultationId={consultationId} consulUserId={user.id} />
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

  const post = await getConsultationDetails(postId);
  if (typeof post !== "string") {
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