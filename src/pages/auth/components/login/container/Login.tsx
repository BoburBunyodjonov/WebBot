import { Button, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PasswordInput from "../../../../../components/form/passwordInput/PasswordInput";
import useLoginContext from "../services/loginContext";

const Login = () => {
  const {
    state: {userId},
    formMethods: { handleSubmit, control, formState: { errors } },
    actions: { onFinish },
  } = useLoginContext();

  return (
    <form onSubmit={handleSubmit(onFinish)} className="space-y-3">
      {userId}
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

      {/* <Controller
        name="chat_id"
        control={control}
        rules={{
          required: "Chat ID is required",
          pattern: {
            value: /^\d+$/, 
            message: "Chat ID must be numeric",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Chat Id"
            error={!!errors.chat_id}
            helperText={errors.chat_id ? errors.chat_id.message : ""}
          />
        )}
      /> */}

      <PasswordInput control={control} name="password"  />

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
