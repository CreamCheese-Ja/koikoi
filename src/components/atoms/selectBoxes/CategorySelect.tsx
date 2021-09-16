import React, { Dispatch, SetStateAction } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { SetterOrUpdater } from "recoil";

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 150,
    },
  })
);

type Props = {
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

const CategorySelect = (props: Props) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    props.setValue((value) => ({
      ...value,
      text: event.target.value as string,
    }));
  };

  return (
    <>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        error={props.error}
        disabled={props.disabled}
      >
        <InputLabel id="demo-simple-select-outlined-label">
          カテゴリー
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={props.value}
          onChange={handleChange}
          label="カテゴリー"
        >
          <MenuItem value="出会い">出会い</MenuItem>
          <MenuItem value="片想い">片想い</MenuItem>
          <MenuItem value="恋人未満">恋人未満</MenuItem>
          <MenuItem value="恋人">恋人</MenuItem>
          <MenuItem value="復縁">復縁</MenuItem>
          <MenuItem value="結婚">結婚</MenuItem>
          <MenuItem value="浮気">浮気</MenuItem>
          <MenuItem value="不倫">不倫</MenuItem>
          <MenuItem value="その他">その他</MenuItem>
        </Select>
        {props.errorMessage === "" ? (
          <div></div>
        ) : (
          <FormHelperText>{props.errorMessage}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default CategorySelect;
