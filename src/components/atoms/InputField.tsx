import React, { Dispatch, SetStateAction } from "react";
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

const InputField = (props: Props) => {
  return (
    <div>
      <TextField
        error={props.error}
        helperText={props.error === true ? props.errorMessage : ""}
        label={props.label}
        variant="outlined"
        type={props.type}
        value={props.value}
        disabled={props.disabled}
        onChange={(e) => {
          props.onChange(() => e.target.value);
        }}
        style={{ width: "230px", marginTop: "10px", marginBottom: "10px" }}
      />
    </div>
  );
};

export default InputField;
