import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import Head from "next/head";
import {
  ConsultationDetails,
  getConsultationDetails,
} from "src/firebase/firestore";
import styles from "styles/consultation.module.css";

interface SSRProps {
  post: ConsultationDetails;
}

export default function Consultation({ post }: SSRProps) {
  const { user, title, content, createdAt } = post;

  return (
    <div>
      <Head>
        <title>{title} | 恋愛相談SNS</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.dateAndUserArea}>
          <div className={styles.userArea}>
            {user.photoURL === "noImage" ? (
              <Image src={noProfile} width={30} height={30} />
            ) : (
              <Image src={user.photoURL} width={30} height={30} />
            )}
            <div className={styles.name}>{user.name}</div>
          </div>
          <div>{createdAt}</div>
        </div>

        <div className={styles.content}>{content}</div>
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
