import { useState } from "react";
import Button from "../../common/Button";
import FormWrapper from "../../common/FormWrapper";
import { TextInput } from "../../common/Inputs";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../api/authApi";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../store/useAuth";
import { useToastStore } from "../../../store/useToast";

const SignupForm = () => {
  const navigate = useNavigate();
  // Pull in our login function from our user context
  const { login } = useAuthStore();
  const { user } = useAuthStore();
  const [duplicateCreds, setDuplicateCreds] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  // init our useForm handlers and default values
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      smsOptIn: null,
      password: "",
    },
  });
  const smsOptIn = watch("smsOptIn");

  // Pas values to our onSubmit. Values will be our useForm registered values
  const onSubmit = async (values) => {
    // Call our registerUser API route, add data to local storage, login the user with our login function
    try {
      const res = await registerUser(values);

      if (res?.user && res?.token) {
        localStorage.setItem("jwt", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        login(res.user, res.token);
        navigate("/onboarding/doctors");
        setTimeout(() => {
          showToast({
            title: `Account Created Successfully`,
            message: `Hey, ${res.user?.first_name}. Welcome, we're glad you're here!`,
            titleClass: "text-success",
          });
        }, 250);
      }
    } catch (error) {
      if (error.status === 409) {
        showToast({
          title: `Error Creating Account`,
          message: `Email or phone number already in use. Try logging in.`,
          titleClass: "text-danger",
        });
      } else if (error.status === 400) {
        showToast({
          title: `Error Creating Account`,
          message: `Please fill in all required fields`,
          titleClass: "text-danger",
        });
      } else if (error.status === 500 || error.status === 404) {
        showToast({
          title: `Server Error`,
          message: `There seems to have been on error on our end. Please try again later.`,
          titleClass: "text-danger",
        });
      }
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
            required
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
            required
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
      <div className="row">
        <div className="col-12 mb-4">
          <TextInput
            type="email"
            required
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
            required
            placeholder="Your phone number"
            {...register("phone", {
              required: "Phone number is required",
              validate: (raw) => {
                const digitsOnly = raw.replace(/[^\d+]/g, "");
                const normalized = digitsOnly.startsWith("+")
                  ? digitsOnly
                  : `+${digitsOnly}`;
                const isValid = /^\+[1-9]\d{1,14}$/.test(normalized);
                return isValid || "Please enter a valid phone number";
              },
            })}
            onChange={(evt) => {
              const digits = evt.target.value.replace(/\D/g, "");
              setValue("phone", digits ? `+${digits}` : "", {
                shouldValidate: true,
              });
            }}
          />
          <div className="d-flex flex-column">
            {errors.phone && (
              <span className="text-danger small mt-1">
                {errors.phone.message}
              </span>
            )}
            {!errors.phone && (
              <span className="small text-body mt-1">
                Begin your phone number with your country code
              </span>
            )}
          </div>
          <fieldset className="mt-4">
            <legend className="small text-body">
              Would you like to opt in to recieve SMS notifications?
            </legend>
            <div className="d-flex gap-3">
              <div className="d-flex gap-1">
                <input
                  type="radio"
                  id="true"
                  name="sms_opt_in"
                  value="True"
                  onChange={() => setValue("smsOptIn", true)}
                />
                <label htmlFor="true" className="text-body">
                  Yes
                </label>
              </div>
              <div className="d-flex gap-1">
                <input
                  type="radio"
                  id="false"
                  name="sms_opt_in"
                  value="False"
                  onChange={() => setValue("smsOptIn", false)}
                />
                <label htmlFor="false" className="text-body">
                  Not Now
                </label>
              </div>
            </div>
          </fieldset>
        </div>

        <div className="col-12 mb-4">
          <TextInput
            labelText="Create A Password"
            placeholder="Create A Password"
            required
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
      </div>
      {duplicateCreds && (
        <span className="small text-danger text-center mb-4">
          * Email or phone number already in use. Please login or provide a
          different email or phone number.
        </span>
      )}
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
