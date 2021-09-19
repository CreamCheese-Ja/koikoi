import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import Head from "next/head";
import {
  checkUserLike,
  ConsultationDetails,
  getConsultationDetails,
} from "src/firebase/firestore";
import styles from "styles/consultation.module.css";
import Divider from "@material-ui/core/Divider";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { consulCategory } from "src/components/atoms/ConsultationArea";
import { useEffect, useState } from "react";
import AnswerButton from "src/components/atoms/buttons/AnswerButton";
import ConsulDetailLikeButton from "src/components/atoms/buttons/ConsulDetailLikeButton";
import { useRecoilValue } from "recoil";
import { authCheckState, userProfileState } from "src/atoms/atom";

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
    updatedAt,
  } = post;

  // 回答数のstate
  const [answer, setAnswer] = useState(numberOfAnswer);
  // いいね数のstate
  const [like, setLike] = useState(numberOfLikes);
  // ユーザーがいいねしているかどうかのstate
  const [userLike, setUserLike] = useState({ check: false, status: false });
  // onAuthStateChangedでチェック有無の値
  const authCheck = useRecoilValue(authCheckState);

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  useEffect(() => {
    const get = async () => {
      const userLike = await checkUserLike(
        userProfile.id,
        "consultations",
        consultationId
      );
      if (userLike) {
        setUserLike({ check: true, status: true });
      } else {
        setUserLike({ check: true, status: false });
      }
    };
    if (!userLike.check && authCheck) {
      get();
    }
  }, [authCheck]);

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
            <span className={styles.answer}>{answer}</span>回答
          </div>
        </div>

        <div className={styles.categoryAndSolution}>
          <div className={styles.category}>{consulCategory(category)}</div>
          {solution ? (
            <div className={styles.solution}>解決済み</div>
          ) : (
            <div className={styles.noSolution}>回答待ち</div>
          )}
        </div>

        <Divider />
        <div className={styles.content}>{content}</div>
        <div>
          <div className={styles.likeButtonArea}>
            {userLike.status ? (
              <div>
                <FavoriteIcon color="primary" />
              </div>
            ) : (
              <div>
                <ConsulDetailLikeButton
                  userId={user.id}
                  consultationId={consultationId}
                  like={like}
                  setLike={setLike}
                  setUserLike={setUserLike}
                />
              </div>
            )}
            <div className={styles.numberOfLikes}>{like}</div>
          </div>

          <div>補足ぼたん</div>
        </div>
        <Divider />
        {solution ? (
          <div></div>
        ) : (
          <div className={styles.answerButtonArea}>
            <AnswerButton />
          </div>
        )}
      </div>
      {solution ? (
        <div className={styles.container}>
          <h2>ベストアンサー</h2>
        </div>
      ) : (
        <div></div>
      )}

      <div className={styles.container}>
        <h2>回答</h2>
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
