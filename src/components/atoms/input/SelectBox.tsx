import { createStyles, makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { SetterOrUpdater } from "recoil";
import { memo } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    formControl: {
      minWidth: 250,
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
  selectLabel: string;
  selectItem: Array<string>;
};

const SelectBox = memo((props: Props) => {
  const {
    value,
    setValue,
    error,
    errorMessage,
    disabled,
    selectLabel,
    selectItem,
  } = props;

  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue((value) => ({
      ...value,
      text: event.target.value as string,
    }));
  };

  return (
    <>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        error={error}
        disabled={disabled}
      >
        <InputLabel id="demo-simple-select-outlined-label">
          {selectLabel}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={value}
          onChange={handleChange}
          label={selectLabel}
        >
          {selectItem.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
        {errorMessage === "" ? (
          <div></div>
        ) : (
          <FormHelperText>{errorMessage}</FormHelperText>
        )}
      </FormControl>
    </>
  );
});

export default SelectBox;
