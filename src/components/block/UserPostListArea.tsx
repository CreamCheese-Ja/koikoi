import { useCallback, useState } from "react";
import UserConsulListArea from "./UserConsulListArea";
import UserTweetListArea from "./UserTweetListArea";
import UserAnswerListArea from "./UserAnswerListArea";
import { UserAnswerList, UserConsulList, UserTweetList } from "src/type";
import TabBar from "../atoms/others/TabBar";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  consultationListState,
  multipurposeErrorAlertState,
  multipurposeSuccessAlertState,
  tweetListState,
  userProfileState,
} from "src/atoms/atom";
import AlertDialog from "../atoms/dialogs/AlertDialog";
import { deletePostData } from "src/firebase/firestore/common/write/deletePostData";
import useMedia from "use-media";

type Props = {
  pageId: string;
};

const UserPostListArea = (props: Props) => {
  const { pageId } = props;
  const isWide = useMedia({ minWidth: 801 });

  // ユーザープロフィールの値
  const userProfile = useRecoilValue(userProfileState);
  // 恋愛相談リスト変更関数
  const setConsultationList = useSetRecoilState(consultationListState);
  // つぶやきリスト変更関数
  const setTweetList = useSetRecoilState(tweetListState);
  // エラー、サクセスstate
  const setError = useSetRecoilState(multipurposeErrorAlertState);
  const setSuccess = useSetRecoilState(multipurposeSuccessAlertState);

  const [tabValue, setTabValue] = useState(0);
  const [running, setRunning] = useState(false);

  const [userConsulList, setUserConsulList] = useState<UserConsulList>([]);
  const [userAnswerList, setUserAnswerList] = useState<UserAnswerList>([]);
  const [userTweetList, setUserTweetList] = useState<UserTweetList>([]);

  const [isFetchConsul, setIsFetchConsul] = useState(false);
  const [isFetchAnswer, setIsFetchAnswer] = useState(false);
  const [isFetchTweet, setIsFetchTweet] = useState(false);

  const tabItem = ["恋愛相談", "回答", "つぶやき"];

  // 削除ダイアログ
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  // 削除関数に渡すidとsubId
  const [docData, setDocData] = useState({ id: "", subId: "", postName: "" });
  // 削除実行中
  const [deleteRunning, setDeleteRunning] = useState(false);

  // 削除ダイアログ開
  const openDeleteDialog = useCallback(
    (id: string, subId: string, name: string) => {
      setDocData({ id: id, subId: subId, postName: name });
      setShowDeleteDialog(true);
    },
    [docData, showDeleteDialog]
  );

  // 削除ダイアログ閉
  const closeDeleteDialog = useCallback(() => {
    setShowDeleteDialog(false);
  }, [showDeleteDialog]);

  // 恋愛相談削除(回答、いいね!がない場合のみ削除可能)
  const deleteConsultation = async () => {
    setDeleteRunning(true);
    const consulData = userConsulList.filter((data) => {
      return data.consultationId === docData.id;
    });
    if (
      consulData[0].numberOfAnswer === 0 &&
      consulData[0].numberOfLikes === 0
    ) {
      const deleteResult = await deletePostData("consultations", docData.id);
      if (deleteResult) {
        // 1.ユーザーリストから削除
        const newUserConsulList = userConsulList.filter((data) => {
          return data.consultationId !== docData.id;
        });
        setUserConsulList(newUserConsulList);
        // 2.恋愛相談リストから削除
        setConsultationList((consulList) => {
          const newConsulList = consulList.filter((data) => {
            return data.consultationId !== docData.id;
          });
          return newConsulList;
        });
        setSuccess({ status: true, message: "投稿を削除しました。" });
      } else {
        setError({ status: true, message: "エラーが発生しました。" });
        setDeleteRunning(false);
        return;
      }
    } else {
      setError({
        status: true,
        message: "回答、いいね！がある投稿は削除できません。",
      });
      setDeleteRunning(false);
      return;
    }
    setDeleteRunning(false);
    closeDeleteDialog();
  };

  // つぶやき削除(回答、いいね!がない場合のみ削除可能)
  const deleteTweet = async () => {
    setDeleteRunning(true);
    const tweetData = userTweetList.filter((data) => {
      return data.tweetId === docData.id;
    });
    if (
      tweetData[0].numberOfComments === 0 &&
      tweetData[0].numberOfLikes === 0
    ) {
      const deleteResult = await deletePostData("tweets", docData.id);
      if (deleteResult) {
        // 1.ユーザーリストから削除
        const newUserTweetList = userTweetList.filter((data) => {
          return data.tweetId !== docData.id;
        });
        setUserTweetList(newUserTweetList);
        // 2.つぶやきリストから削除
        setTweetList((tweetList) => {
          const newTweetList = tweetList.filter((data) => {
            return data.tweetId !== docData.id;
          });
          return newTweetList;
        });
        setSuccess({ status: true, message: "投稿を削除しました。" });
      } else {
        setError({ status: true, message: "エラーが発生しました。" });
        setDeleteRunning(false);
        return;
      }
    } else {
      setError({
        status: true,
        message: "コメント、いいね！がある投稿は削除できません。",
      });
      setDeleteRunning(false);
      return;
    }
    setDeleteRunning(false);
    closeDeleteDialog();
  };

  // 回答削除(いいね!がない場合のみ削除可能)
  const deleteAnswer = async () => {
    setDeleteRunning(true);
    const answerData = userAnswerList.filter((data) => {
      return data.answerId === docData.subId;
    });
    if (
      answerData[0].numberOfLikes === 0 &&
      answerData[0].bestAnswer === false
    ) {
      const deleteResult = await deletePostData(
        "consultations",
        docData.id,
        "answers",
        docData.subId
      );
      if (deleteResult) {
        // 1.ユーザーリストから削除
        const newUserAnswerList = userAnswerList.filter((data) => {
          return data.answerId !== docData.subId;
        });
        setUserAnswerList(newUserAnswerList);
        // 2.恋愛相談リストの回答数を1減らす
        setConsultationList((consulList) => {
          const newConsulList = consulList.map((data) => {
            if (data.consultationId === docData.id) {
              const newData = {
                ...data,
                numberOfAnswer: data.numberOfAnswer - 1,
              };
              return newData;
            } else {
              return data;
            }
          });
          return newConsulList;
        });
        setSuccess({ status: true, message: "投稿を削除しました。" });
      } else {
        setError({ status: true, message: "エラーが発生しました。" });
        setDeleteRunning(false);
        return;
      }
    } else {
      setError({
        status: true,
        message: "いいね！がある、またはベストアンサーの投稿は削除できません。",
      });
      setDeleteRunning(false);
      return;
    }
    setDeleteRunning(false);
    closeDeleteDialog();
  };

  return (
    <div>
      <TabBar
        tabItem={tabItem}
        value={tabValue}
        setValue={setTabValue}
        tabWidth={isWide ? "160px" : "100px"}
        centered={true}
      />
      {tabValue === 0 ? (
        <UserConsulListArea
          pageId={pageId}
          userConsulList={userConsulList}
          setUserConsulList={setUserConsulList}
          isFetchConsul={isFetchConsul}
          setIsFetchConsul={setIsFetchConsul}
          running={running}
          setRunning={setRunning}
          currentUserId={userProfile.id}
          setError={setError}
          openDeleteDialog={openDeleteDialog}
        />
      ) : (
        <div></div>
      )}
      {tabValue === 1 ? (
        <UserAnswerListArea
          pageId={pageId}
          userAnswerList={userAnswerList}
          setUserAnswerList={setUserAnswerList}
          isFetchAnswer={isFetchAnswer}
          setIsFetchAnswer={setIsFetchAnswer}
          running={running}
          setRunning={setRunning}
          currentUserId={userProfile.id}
          openDeleteDialog={openDeleteDialog}
        />
      ) : (
        <div></div>
      )}
      {tabValue === 2 ? (
        <UserTweetListArea
          pageId={pageId}
          userTweetList={userTweetList}
          setUserTweetList={setUserTweetList}
          isFetchTweet={isFetchTweet}
          setIsFetchTweet={setIsFetchTweet}
          running={running}
          setRunning={setRunning}
          currentUserId={userProfile.id}
          setError={setError}
          openDeleteDialog={openDeleteDialog}
        />
      ) : (
        <div></div>
      )}
      <AlertDialog
        open={showDeleteDialog}
        dialogClose={closeDeleteDialog}
        title={
          docData.postName === "consul"
            ? "恋愛相談の削除"
            : docData.postName === "tweet"
            ? "つぶやきの削除"
            : "回答の削除"
        }
        content="投稿は1度削除すると復元できません。本当に削除しますか？"
        running={deleteRunning}
        mainMethod={
          docData.postName === "consul"
            ? deleteConsultation
            : docData.postName === "tweet"
            ? deleteTweet
            : deleteAnswer
        }
      />
    </div>
  );
};

export default UserPostListArea;
