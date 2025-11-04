import { useState } from "react";
import FormWrapper from "../../common/FormWrapper";
import { TextInput } from "../../common/Inputs";
import Button from "../../common/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../api/authApi";
import { useAuthStore } from "../../../store/useAuth";

const SigninForm = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [credsError, setCredsError] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      // Call our registerUser API route, add data to local storage, login the user with our login function
      const res = await loginUser(values);
      login(res.user, res.token);
      navigate("/dashboard/");
    } catch (error) {
      if (error.includes("401")) {
        // Unauthorized — wrong email or password
        setCredsError(true);
      }
    }
  };

  return (
    <FormWrapper
      className="mt-4 d-flex flex-column"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="row mb-4">
        <div className="col-12">
          <TextInput
            type="email"
            name="email"
            labelText="Your Account Email"
            required
            placeholder="Your Account Email"
            {...register("email", {
              required: "Your email is required",
              pattern: {
                value: /[\w\-.]+@([\w-]+\.)+[\w-]{2,4}/,
                message: "Invalid Email",
              },
            })}
            onChange={(evt) => {
              const target = evt.target;
              setValue("email", target.value, { shouldValidate: true });
            }}
          />
          {errors.email && (
            <span className="text-danger small">{errors.email.message}</span>
          )}
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12">
          <TextInput
            type="password"
            name="password"
            required
            labelText="Your Account Password"
            placeholder="Your Account Password"
            {...register("password", {
              required: "Your Password is required",
              minLength: {
                value: 8,
                message: "Your password should be at least 8 characters",
              },
            })}
            onChange={(evt) => {
              const target = evt.target;
              setValue("password", target.value, { shouldValidate: true });
            }}
          />
          {errors.password && (
            <span className="text-danger small">{errors.password.message}</span>
          )}
        </div>
      </div>

      {credsError && (
        <span className="text-danger text-center small mb-4">
          * Invalid email or password
        </span>
      )}
      <Button
        disabled={!isValid}
        buttonText="Sign In"
        type="submit"
        className={`${
          isValid ? "bg-primary-light" : "bg-light text-body"
        } max-w-fit bg-primary-light text-white align-self-end`}
      />
    </FormWrapper>
  );
};

export default SigninForm;
