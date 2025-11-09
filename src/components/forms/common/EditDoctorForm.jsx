import FormWrapper from "../../common/FormWrapper";
import { SelectInput, TextInput } from "../../common/Inputs";
import Button from "../../common/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addDoctor, createDoctorWithClinic } from "../../../api/doctorApi";
import { useAuthStore } from "../../../store/useAuth";
import { useDoctorStore } from "../../../store/useDoctors";
import { useModal } from "../../../store/modalContext";
import { US_STATES } from "../../../data/constants";

const EditDoctorsForm = ({ initialValues }) => {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      specialty: "",
      imageURL: "",
      clinicName: "",
      clinicEmail: "",
      clinicPhone: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        firstName: initialValues.first_name || "",
        lastName: initialValues.last_name || "",
        specialty: initialValues.specialty || "",
        imageURL: initialValues.image_url || "",
        clinicName: initialValues.clinic_name || "",
        clinicEmail: initialValues.clinic_email || "",
        clinicPhone: initialValues.clinic_phone || "",
        street: initialValues.street || "",
        city: initialValues.city || "",
        state: initialValues.state || "",
        zipcode: initialValues.zipcode || "",
      });
    }
  }, [initialValues, reset]);

  const onSubmit = async (values) => {};

  return (
    <>
      <FormWrapper id="add-doctor-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="row mb-3">
              <div className="col-12">
                <h5 className="border-bottom pb-2">Doctor's Information</h5>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <TextInput
                  labelText="First Name"
                  placeholder="First Name"
                  required
                  {...register("firstName", {
                    required: "This field is required",
                  })}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("firstName", target.value, {
                      shouldValidate: true,
                    });
                  }}
                  isValid
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
                  required
                  {...register("lastName", {
                    required: "This field is required",
                  })}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("lastName", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
                {errors.lastName && (
                  <span className="text-danger small">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <TextInput
                  labelText="Doctors Specialty"
                  placeholder="Doctors Speacialty"
                  required
                  {...register("specialty", {
                    required: "This field is required",
                  })}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("specialty", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
                {errors.specialty && (
                  <span className="text-danger small">
                    {errors.specialty.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12 text-center">
                <TextInput
                  labelText="Doctors Image"
                  placeholder="Doctors Image"
                  {...register("imageURL")}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("imageURL", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
                <span className="small text-body mt-1">
                  Note: Most doctors have public images on Google. Copy and
                  Paste a valid image URL here.
                </span>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="row mb-3">
              <div className="col-12">
                <h5 className="border-bottom pb-2">
                  Doctors's Clinic Information
                </h5>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <TextInput
                  labelText="Clinic Name"
                  placeholder="Clinic Name"
                  required
                  {...register("clinicName", {
                    required: "This field is required",
                  })}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("clinicName", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
                {errors.clinicName && (
                  <span className="text-danger small">
                    {errors.clinicName.message}
                  </span>
                )}
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <TextInput
                  labelText="Clinic's Email"
                  placeholder="Clinic's Email"
                  {...register("clinicEmail")}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("clinicEmail", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              <div className="col-6">
                <TextInput
                  labelText="Clinic's Phone"
                  placeholder="Clinic's Phone"
                  {...register("clinicPhone")}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("clinicPhone", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <TextInput
                  labelText="Street Address"
                  placeholder="Street Address"
                  className="mb-4"
                  {...register("street")}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("street", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              <div className="col-4">
                <TextInput
                  labelText="City"
                  placeholder="City"
                  {...register("city")}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("city", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              <div className="col-4">
                <SelectInput
                  labelText="State"
                  placeholder="State"
                  options={US_STATES}
                  defaultOptionText="State"
                  {...register("state")}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("state", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              <div className="col-4">
                <TextInput
                  labelText="Zipcode"
                  placeholder="Zipcode"
                  {...register("zipcode")}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("zipcode", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Button
              disabled={!isValid}
              buttonText="Submit"
              type="submit"
              className={`${
                isValid ? "bg-primary-light" : "bg-light text-body"
              } max-w-fit bg-primary-light text-white align-self-end`}
            />
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default EditDoctorsForm;
