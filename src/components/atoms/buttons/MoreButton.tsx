import { useState } from "react";
import BasicExecutionButton from "./BasicExecutionButton";

const MoreButton = () => {
  const fetchNextPage = () => {};
  const [running, setRunning] = useState(false);

  return (
    <>
      <BasicExecutionButton
        onClick={fetchNextPage}
        buttonLabel="もっと見る"
        disabled={running}
      />
    </>
  );
};

export default MoreButton;
