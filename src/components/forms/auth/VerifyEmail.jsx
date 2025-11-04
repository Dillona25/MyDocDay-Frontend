import FormWrapper from "../../common/FormWrapper";
import { TextInput } from "../../common/Inputs";
import Button from "../../common/Button";
import { useForm } from "react-hook-form";

export const VerifyEmailForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      code: "",
    },
  });

  return (
    <FormWrapper className="mt-4 d-flex flex-column">
      <div className="row mb-4">
        <div className="col-12">
          <TextInput
            labelText="Six Digit Code"
            required
            placeholder="Six Digit Code"
            {...register("code", {
              required: "Verification Code Required",
              minLength: {
                value: 6,
              },
            })}
            onChange={(evt) => {
              const target = evt.target;
              setValue("code", target.value, { shouldValidate: true });
            }}
          />
          {errors.code && (
            <span className="text-danger small">{errors.code.message}</span>
          )}
        </div>
      </div>
      <Button
        disabled={!isValid}
        buttonText="Verify Email"
        type="submit"
        className={`${
          isValid ? "bg-primary-light" : "bg-light text-body"
        } max-w-fit bg-primary-light text-white align-self-end`}
      />
    </FormWrapper>
  );
};
