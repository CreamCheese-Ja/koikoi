import { useEffect, useState } from "react";
import UserConsulListArea from "./UserConsulListArea";
import UserTweetListArea from "./UserTweetListArea";
import UserAnswerListArea from "./UserAnswerListArea";
import { UserAnswerList, UserConsulList, UserTweetList } from "src/type";
import TabBar from "../atoms/others/TabBar";

type Props = {
  userId: string;
};

const PostListArea = (props: Props) => {
  const { userId } = props;

  const [tabValue, setTabValue] = useState(0);
  const [running, setRunning] = useState(false);

  const [userConsulList, setUserConsulList] = useState<UserConsulList>([]);
  const [userAnswerList, setUserAnswerList] = useState<UserAnswerList>([]);
  const [userTweetList, setUserTweetList] = useState<UserTweetList>([]);

  const [isFetchConsul, setIsFetchConsul] = useState(false);
  const [isFetchAnswer, setIsFetchAnswer] = useState(false);
  const [isFetchTweet, setIsFetchTweet] = useState(false);

  const tabItem = ["恋愛相談", "回答", "つぶやき"];

  return (
    <div>
      <TabBar
        tabItem={tabItem}
        value={tabValue}
        setValue={setTabValue}
        tabWidth="160px"
        centered={true}
      />
      {tabValue === 0 ? (
        <UserConsulListArea
          userId={userId}
          userConsulList={userConsulList}
          setUserConsulList={setUserConsulList}
          isFetchConsul={isFetchConsul}
          setIsFetchConsul={setIsFetchConsul}
          running={running}
          setRunning={setRunning}
        />
      ) : (
        <div></div>
      )}
      {tabValue === 1 ? (
        <UserAnswerListArea
          userId={userId}
          userAnswerList={userAnswerList}
          setUserAnswerList={setUserAnswerList}
          isFetchAnswer={isFetchAnswer}
          setIsFetchAnswer={setIsFetchAnswer}
          running={running}
          setRunning={setRunning}
        />
      ) : (
        <div></div>
      )}
      {tabValue === 2 ? (
        <UserTweetListArea
          userId={userId}
          userTweetList={userTweetList}
          setUserTweetList={setUserTweetList}
          isFetchTweet={isFetchTweet}
          setIsFetchTweet={setIsFetchTweet}
          running={running}
          setRunning={setRunning}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PostListArea;
