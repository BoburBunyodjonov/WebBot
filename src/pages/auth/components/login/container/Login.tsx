import { Button, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import PasswordInput from "../../../../../components/form/passwordInput/PasswordInput";
import { useLoginContext } from "../services/loginContext";

const Login = () => {
  const {
    formMethods: { handleSubmit, control, formState: { errors } },
    actions: { onFinish },
  } = useLoginContext();


  return (
    <form onSubmit={handleSubmit(onFinish)} className="space-y-3">
      <Controller
        name="phone_number"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            margin="normal"
            fullWidth
            label="Login or Phone Number"
            error={!!errors.phone_number}
             helperText={errors.phone_number ? errors.phone_number.message : ""}
          />
        )}
      />
      {errors.phone_number && <p>{errors.phone_number.message}</p>}
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
