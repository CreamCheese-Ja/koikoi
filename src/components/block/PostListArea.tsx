import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import UserConsulListArea from "./UserConsulListArea";
import { UserAnswerList, UserConsulList, UserTweetList } from "src/type";
import UserTweetListArea from "./UserTweetListArea";
import UserAnswerListArea from "./UserAnswerListArea";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    borderRadius: "5px 5px 0 0",
    boxShadow: "none",
    borderBottom: "1px solid #b0b0b0",
  },
});

type Props = {
  userId: string;
};

const PostListArea = (props: Props) => {
  const { userId } = props;
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [userConsulList, setUserConsulList] = useState<UserConsulList>([]);
  const [userTweetList, setUserTweetList] = useState<UserTweetList>([]);
  const [userAnswerList, setUserAnswerList] = useState<UserAnswerList>([]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    // 最初にここで3種類のリストを空にする
    setUserConsulList([]);
    setUserTweetList([]);
    setUserAnswerList([]);
  }, []);

  return (
    <div>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="恋愛相談" />
          <Tab label="回答" />
          <Tab label="つぶやき" />
        </Tabs>
      </Paper>
      {value === 0 ? (
        <UserConsulListArea
          userId={userId}
          userConsulList={userConsulList}
          setUserConsulList={setUserConsulList}
        />
      ) : (
        <div></div>
      )}
      {value === 1 ? (
        <UserAnswerListArea
          userId={userId}
          userAnswerList={userAnswerList}
          setUserAnswerList={setUserAnswerList}
        />
      ) : (
        <div></div>
      )}
      {value === 2 ? (
        <UserTweetListArea
          userId={userId}
          userTweetList={userTweetList}
          setUserTweetList={setUserTweetList}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PostListArea;
