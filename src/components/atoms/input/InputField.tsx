import React, { Dispatch, memo, SetStateAction } from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
  label: string;
  type: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  error: boolean;
  errorMessage: string;
  disabled: boolean;
};

const InputField = memo((props: Props) => {
  const { label, type, value, onChange, error, errorMessage, disabled } = props;

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
        onChange={(e) => {
          onChange(() => e.target.value);
        }}
        style={{ width: "230px", marginTop: "10px", marginBottom: "10px" }}
      />
    </div>
  );
});

export default InputField;
