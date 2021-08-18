import React, { Dispatch, SetStateAction } from "react";
import TextField from "@material-ui/core/TextField";

type Props = {
  label: string;
  type: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  error: boolean;
  errorMessage: string;
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
        onChange={(e) => {
          props.onChange(() => e.target.value);
        }}
        style={{ width: "230px" }}
      />
    </div>
  );
};

export default InputField;
