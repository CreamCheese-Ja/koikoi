import DeleteIcon from "@material-ui/icons/Delete";
import { memo } from "react";

type Props = {
  onClick: () => void;
};

const DeleteButton = (props: Props) => {
  const { onClick } = props;
  return (
    <div
      style={{ cursor: "pointer", display: "inline-block" }}
      onClick={onClick}
    >
      <DeleteIcon fontSize="small" />
    </div>
  );
};

export default memo(DeleteButton);
