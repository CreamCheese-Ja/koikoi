import React, { memo } from "react";
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
  disabled: boolean;
};

const MultilineTextField = memo((props: Props) => {
  const { label, value, setValue, error, errorMessage, disabled } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((value) => ({ ...value, text: event.target.value }));
  };

  return (
    <div>
      <TextField
        id="outlined-multiline-flexible"
        error={error}
        helperText={error === true ? errorMessage : ""}
        label={label}
        multiline
        maxRows={10}
        value={value}
        onChange={handleChange}
        variant="outlined"
        style={{ width: "250px" }}
        disabled={disabled}
      />
    </div>
  );
});

export default MultilineTextField;
