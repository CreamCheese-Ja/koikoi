import React, { ChangeEvent, Dispatch, memo, SetStateAction } from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
  label: string;
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  error: boolean;
  errorMessage: string;
  disabled: boolean;
};

const BasicTextField = (props: Props) => {
  const { label, type, value, setValue, error, errorMessage, disabled } = props;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(() => e.target.value);
  };

  return (
    <div>
      <TextField
        error={error}
        helperText={error === true ? errorMessage : ""}
        label={label}
        variant="outlined"
        type={type}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        style={{ width: "230px", marginTop: "10px", marginBottom: "10px" }}
      />
    </div>
  );
};

export default memo(BasicTextField);
