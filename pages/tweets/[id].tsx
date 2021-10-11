import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import styles from "styles/consultation.module.css";
import { useRecoilValue } from "recoil";
import { userProfileState } from "src/atoms/atom";
import { getTweetDetails } from "src/firebase/firestore/tweets/get/getTweetDetails";
import { TweetDetails } from "src/type";
import Image from "next/image";
import noProfile from "public/images/no-profile.png";
import { Divider } from "@material-ui/core";
import TweetDetailLikeButton from "src/components/modules/buttons/TweetDetailLikeButton";
import Category from "src/components/atoms/others/Category";
import SupplementButton from "src/components/atoms/buttons/SupplementButton";
import SupplementField from "src/components/modules/textFields/SupplementField";

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

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);

  return (
    <div>
      <Head>
        <title>
          {content.length <= 20 ? content : content.slice(0, 20) + "..."} |
          恋々(恋愛相談SNS)
        </title>
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
        <div className={styles.categoryAndSolution}>
          <div className={styles.category}>
            <Category categoryLabel={category} />
          </div>
        </div>
        <Divider />
        <div className={styles.content}>{content}</div>
        <div className={styles.likeAndSupplementArea}>
          <div className={styles.likeButtonArea}>
            <TweetDetailLikeButton
              numberOfLikes={numberOfLikes}
              docId={tweetId}
              userId={user.id}
              userProfile={userProfile}
            />
          </div>
          <div>
            <SupplementButton />
          </div>
        </div>
        <div>
          <SupplementField userId={user.id} docId={tweetId} />
        </div>
        <Divider />
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
