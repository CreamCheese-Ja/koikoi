import { useRouter } from "next/router";
import { useEffect, useState, memo } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      position: "absolute",
      top: 0,
    },
  })
);

const PageLoading = () => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStart = (url: string) => {
    if (url !== router.pathname) {
      setLoading(true);
    }
  };
  const handleComplete = (url: string) => {
    if (url !== router.pathname) {
      setLoading(false);
    }
  };
  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className={classes.root}>
          <LinearProgress style={{ backgroundColor: "#fff" }} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(PageLoading);
