import Button from "@material-ui/core/Button";
import { useRecoilState } from "recoil";
import { displaySupplementFieldState } from "src/atoms/atom";

const SupplementButton = () => {
  const [displaySupplementField, setDisplaySupplementField] = useRecoilState(
    displaySupplementFieldState
  );

  return (
    <>
      <Button
        color="primary"
        onClick={() => setDisplaySupplementField(!displaySupplementField)}
      >
        {displaySupplementField ? "入力欄を閉じる" : "補足を追加"}
      </Button>
    </>
  );
};

export default SupplementButton;
