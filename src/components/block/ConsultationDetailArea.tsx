import styles from "styles/components/block/detailArea.module.css";
import Divider from "@material-ui/core/Divider";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  authCheckState,
  displaySupplementFieldState,
  supplementsState,
} from "src/atoms/atom";
import SupplementField from "src/components/modules/textFields/SupplementField";
import ConsulDetailLikeButton from "src/components/modules/buttons/ConsulDetailLikeButton";
import SupplementArea from "src/components/block/SupplementArea";
import NumberOfAnswer from "src/components/atoms/others/NumberOfAnswer";
import { ConsultationDetails, ProfileItem } from "src/type";
import Solution from "src/components/atoms/others/Solution";
import Category from "src/components/atoms/others/Category";
import UserPhoto from "src/components/atoms/others/UserPhoto";
import BasicButton from "../atoms/buttons/BasicButton";
import ExecutionButton from "../atoms/buttons/ExecutionButton";
import CreateAnswerDialog from "../modules/dialogs/CreateAnswerDialog";
import { useState } from "react";

type Props = {
  post: ConsultationDetails;
  userProfile: ProfileItem;
  consulDataState: ConsultationDetails | null;
};

const ConsultationDetailArea = (props: Props) => {
  const { post, userProfile, consulDataState } = props;

  // 補足stateの値
  const supplements = useRecoilValue(supplementsState);

  const [displaySupplementField, setDisplaySupplementField] = useRecoilState(
    displaySupplementFieldState
  );

  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);

  const openCloseDialog = () => {
    setOpenAnswerDialog((status) => !status);
  };
  // 認証チェックのstate値
  const isAuthCheck = useRecoilValue(authCheckState);

  return (
    <div className={styles.container}>
      <div className={styles.dateAndUserArea}>
        <div className={styles.userArea}>
          {consulDataState ? (
            <UserPhoto
              photoURL={
                userProfile.id === post.user.id
                  ? userProfile.photoURL
                  : post.user.photoURL
              }
              width={30}
              height={30}
              userId={post.user.id}
            />
          ) : (
            <div style={{ height: "35px" }}></div>
          )}
          <div className={styles.name}>{post.user.name}</div>
        </div>
        <div>{post.createdAt}</div>
      </div>
      <div className={styles.titleAndAnswer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.answerArea}>
          {consulDataState ? (
            <NumberOfAnswer initialNumberOfAnswer={post.numberOfAnswer} />
          ) : (
            <div style={{ height: "31px" }}></div>
          )}
        </div>
      </div>
      <div className={styles.categoryAndSolution}>
        <div className={styles.category}>
          <Category categoryLabel={post.category} />
        </div>
        {consulDataState ? <Solution solution={post.solution} /> : <></>}
      </div>
      <Divider />
      <div className={styles.content}>{post.content}</div>
      <div className={styles.likeAndSupplementArea}>
        <div className={styles.likeButtonArea}>
          {consulDataState ? (
            <ConsulDetailLikeButton
              numberOfLikes={post.numberOfLikes}
              docId={post.consultationId}
              userId={post.user.id}
              userProfile={userProfile}
            />
          ) : (
            <></>
          )}
        </div>
        {post.user.id === userProfile.id &&
        post.supplement === "" &&
        consulDataState &&
        !(post.consultationId in supplements) ? (
          <div>
            <BasicButton
              onClick={() => setDisplaySupplementField(!displaySupplementField)}
              buttonLabel={
                displaySupplementField ? "入力欄を閉じる" : "補足を追加"
              }
              variant="text"
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {post.user.id === userProfile.id &&
      post.supplement === "" &&
      consulDataState ? (
        <div>
          <SupplementField userId={post.user.id} docId={post.consultationId} />
        </div>
      ) : (
        <div></div>
      )}
      <SupplementArea
        supplement={post.supplement}
        consulId={post.consultationId}
        supplementCreatedAt={post.supplementCreatedAt}
      />
      <Divider />
      {post.solution || userProfile.id === post.user.id ? (
        <div></div>
      ) : consulDataState ? (
        <div className={styles.answerButtonArea}>
          {isAuthCheck ? (
            <ExecutionButton
              onClick={openCloseDialog}
              buttonLabel="相談に回答"
              disabled={false}
            />
          ) : (
            <div></div>
          )}
          <CreateAnswerDialog
            open={openAnswerDialog}
            openCloseDialog={openCloseDialog}
            consultationId={post.consultationId}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ConsultationDetailArea;
