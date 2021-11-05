import { makeStyles, Paper, Tab, Tabs } from "@material-ui/core";
import { ChangeEvent, Dispatch, memo, SetStateAction } from "react";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    borderRadius: "5px 5px 0 0",
    boxShadow: "none",
    borderBottom: "1px solid #b0b0b0",
  },
});

type Props = {
  tabItem: Array<string>;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  tabWidth: string;
  centered: boolean;
};

const TabBar = memo((props: Props) => {
  const { tabItem, value, setValue, tabWidth, centered } = props;
  const classes = useStyles();

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Paper className={classes.root}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered={centered}
        >
          {tabItem.map((item) => (
            <Tab label={item} style={{ minWidth: tabWidth }} key={item} />
          ))}
        </Tabs>
      </Paper>
    </>
  );
});

export default TabBar;
