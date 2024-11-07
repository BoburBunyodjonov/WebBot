import { Button, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import PasswordInput from "../../../../../components/form/passwordInput/PasswordInput";
import useLoginContext from "../services/loginContext";
import { toast } from "react-toastify";

const Login = () => {
  const {
    state: { userId },
    formMethods: { handleSubmit, control, formState: { errors } },
    actions: { onFinish },
  } = useLoginContext();


  const handleCopyToClipboard = () => {
    if (userId !== null) {
      navigator.clipboard.writeText(userId.toString())
        .then(() => {
          toast.info('User ID copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onFinish)} className="space-y-3">
      <TextField
        value={userId !== null ? userId : ""}
        label="User id"
        margin="normal"
        InputProps={{
          readOnly: true,
          onClick: handleCopyToClipboard,
          // onFocus: handleCopyToClipboard,
          className: "cursor-pointer no-outline"
        }}
        className="cursor-pointer no-outline"
        fullWidth
      />

      <Controller
        name="login"
        control={control}
        defaultValue=""
        rules={{ required: "Login is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Login"
            error={!!errors.login}
            helperText={errors.login ? errors.login.message : ""}
          />
        )}
      />

      <PasswordInput control={control} name="password" />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 2, mb: 2 }}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
