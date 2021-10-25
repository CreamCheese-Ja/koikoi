import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Dispatch, memo, SetStateAction } from "react";
import { FormHelperText } from "@material-ui/core";

export type PasswordState = {
  password: string;
  showPassword: boolean;
};

type Props = {
  error: boolean;
  errorMessage: string;
  password: PasswordState;
  setPassword: Dispatch<SetStateAction<PasswordState>>;
  placeholder: string;
};

const PasswordField = memo((props: Props) => {
  const { error, errorMessage, password, setPassword, placeholder } = props;

  const handleChange =
    (prop: keyof PasswordState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword({ ...password, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div>
      <FormControl
        variant="outlined"
        style={{ width: "230px", marginTop: "10px", marginBottom: "10px" }}
      >
        <InputLabel
          htmlFor="outlined-adornment-password"
          style={error ? { color: "red" } : {}}
        >
          パスワード
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={password.showPassword ? "text" : "password"}
          value={password.password}
          onChange={handleChange("password")}
          error={error}
          placeholder={placeholder}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {password.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
          labelWidth={80}
        />
        <FormHelperText style={{ color: "red" }}>{errorMessage}</FormHelperText>
      </FormControl>
    </div>
  );
});

export default PasswordField;
