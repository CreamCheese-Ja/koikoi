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
  rows: number;
};

const MultilineTextField = (props: Props) => {
  const { label, value, setValue, error, errorMessage, disabled, rows } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((value) => ({ ...value, text: event.target.value }));
  };

  return (
    <>
      <TextField
        id="outlined-multiline-flexible"
        error={error}
        helperText={error === true ? errorMessage : ""}
        label={label}
        multiline
        rows={rows}
        maxRows={10}
        value={value}
        onChange={handleChange}
        variant="outlined"
        style={{ width: "230px" }}
        disabled={disabled}
      />
    </>
  );
};

export default memo(MultilineTextField);
