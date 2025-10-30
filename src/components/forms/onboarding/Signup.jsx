import { useState } from "react";
import Button from "../../common/Button";
import FormWrapper from "../../common/FormWrapper";
import { TextInput } from "../../common/Inputs";
import { useNavigate } from "react-router-dom";
import { mockApi, registerUser } from "../../../api/authApi";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../store/AuthContext.jsx";

const SignupForm = () => {
  const navigate = useNavigate();
  // Pull in our login function from our user context
  const { login } = useAuth();

  // init our useForm handlers and default values
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  // Pas values to our onSubmit. Values will be our useForm registered values
  const onSubmit = async (values) => {
    try {
      // Call our registerUser API route, add data to local storage, login the user with our login function
      const res = await registerUser(values);
      if (res?.user && res?.token) {
        localStorage.setItem("jwt", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        login(res.user, res.token);
        navigate("/onboarding/doctors/");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <FormWrapper
      className="mt-5 d-flex flex-column"
      id="sign-up-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="row mb-4">
        <div className="col-6">
          <TextInput
            labelText="First Name"
            placeholder="First Name"
            {...register("firstName", {
              required: "First name is required",
              minLength: {
                value: 2,
                message: "Use 2 or more characters",
              },
            })}
            onChange={(evt) => {
              const target = evt.target;
              setValue("firstName", target.value, { shouldValidate: true });
            }}
          />
          {errors.firstName && (
            <span className="text-danger small">
              {errors.firstName.message}
            </span>
          )}
        </div>
        <div className="col-6">
          <TextInput
            labelText="Last Name"
            placeholder="Last Name"
            {...register("lastName", {
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Use 2 or more characters",
              },
            })}
            onChange={(evt) => {
              const target = evt.target;
              setValue("lastName", target.value, { shouldValidate: true });
            }}
          />
          {errors.lastName && (
            <span className="text-danger small">{errors.lastName.message}</span>
          )}
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12 mb-4">
          <TextInput
            type="email"
            labelText="Your Email"
            placeholder="Your Email"
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
        <div className="col-12 mb-4">
          <TextInput
            labelText="Your Phone Number"
            placeholder="Your Phone Number"
            {...register("phone", {
              required: "Phone number is required",
              minLength: {
                value: 10,
                message: "Invalid Phone Number",
              },
            })}
            onChange={(evt) => {
              const target = evt.target;
              setValue("phone", target.value, { shouldValidate: true });
            }}
          />
          {errors.phone && (
            <span className="text-danger small">{errors.phone.message}</span>
          )}
        </div>

        <div className="col-12 mb-4">
          <TextInput
            labelText="Create A Password"
            placeholder="Create A Password"
            type="password"
            {...register("password", {
              required: "A Secure Password is required",
              minLength: {
                value: 8,
                message: "Please use at least 8 characters",
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
        {/* <div className="col-12">
          <TextInput
            name="password"
            required={true}
            labelText="Confirm Password"
            placeholder="Confirm Password"
            type="password"
          />
        </div> */}
      </div>
      <Button
        disabled={!isValid}
        buttonText="Next"
        type="submit"
        className={`${
          isValid ? "bg-primary-light" : "bg-light text-body"
        } max-w-fit bg-primary-light text-white align-self-end`}
      />
    </FormWrapper>
  );
};

export default SignupForm;
