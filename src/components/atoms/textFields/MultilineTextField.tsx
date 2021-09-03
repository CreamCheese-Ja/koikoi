import React from "react";
import TextField from "@material-ui/core/TextField";
import { SetterOrUpdater } from "recoil";

type Props = {
  label: string;
  value: string;
  setValue: SetterOrUpdater<{
    text: string;
    errorStatus: boolean;
    errorMessage: string;
  }>;
  error: boolean;
  errorMessage: string;
};

const MultilineTextField = (props: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue((value) => ({ ...value, text: event.target.value }));
  };

  return (
    <div>
      <TextField
        id="outlined-multiline-flexible"
        error={props.error}
        helperText={props.error === true ? props.errorMessage : ""}
        label={props.label}
        multiline
        maxRows={5}
        value={props.value}
        onChange={handleChange}
        variant="outlined"
        style={{ width: "250px" }}
      />
    </div>
  );
};

export default MultilineTextField;
