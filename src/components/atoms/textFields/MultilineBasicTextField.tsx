import TextField from "@material-ui/core/TextField";
import { SetterOrUpdater } from "recoil";
import { InputAdornment } from "@material-ui/core";
import SendButton from "../buttons/SendButton";
import Linear from "../progress/Linear";

type Props = {
  label: string;
  placeholder: string;
  value: string;
  setValue: SetterOrUpdater<string>;
  running: boolean;
  onClick: () => void;
};

const MultilineBasicTextField = (props: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(() => event.target.value);
  };
  return (
    <>
      <Linear running={props.running} />
      <TextField
        id="standard-textarea"
        label={props.label}
        placeholder={props.placeholder}
        multiline
        variant="filled"
        value={props.value}
        onChange={handleChange}
        disabled={props.running}
        style={{ width: "100%" }}
        InputProps={{
          style: { alignItems: "flex-end" },
          endAdornment: (
            <InputAdornment position="end">
              <SendButton
                value={props.value}
                setValue={props.setValue}
                onClick={props.onClick}
                running={props.running}
              />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default MultilineBasicTextField;
