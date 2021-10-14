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
  const { label, placeholder, value, setValue, running, onClick } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(() => event.target.value);
  };
  return (
    <>
      <Linear running={running} />
      <TextField
        id="standard-textarea"
        label={label}
        placeholder={placeholder}
        multiline
        variant="filled"
        value={value}
        onChange={handleChange}
        disabled={running}
        style={{ width: "100%" }}
        InputProps={{
          style: { alignItems: "flex-end" },
          endAdornment: (
            <InputAdornment position="end">
              <SendButton
                value={value}
                setValue={setValue}
                onClick={onClick}
                running={running}
              />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default MultilineBasicTextField;
