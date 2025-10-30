import FormWrapper from "../../common/FormWrapper";
import { TextInput } from "../../common/Inputs";
import Button from "../../common/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { addDoctor, createDoctorWithClinic } from "../../../api/doctorApi";
import { useAuth } from "../../../store/AuthContext";
import { useDoctors } from "../../../store/usersDoctorsContext";
import { addClinic } from "../../../api/clinicApi";

const AddDoctors = () => {
  const { user } = useAuth();
  const { addDoctorToList } = useDoctors();
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
      speacialty: "",
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

  const onSubmit = async (values) => {
    const payload = {
      user_id: user?.id,
      first_name: values.firstName,
      last_name: values.lastName,
      specialty: values.specialty,
      image_url: values.imageURL,
      clinic_name: values.clinicName,
      clinic_email: values.clinicEmail,
      clinic_phone: values.clinicPhone,
      street: values.street,
      city: values.city,
      state: values.state,
      zipcode: values.zipcode,
    };
    try {
      const res = await createDoctorWithClinic(payload);
      // Add the doctor to our users doctors context
      addDoctorToList({
        ...res.doctor,
        clinic: res.clinic,
      });
      console.log("Doctor added:", res);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

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
                    required: "First name is required",
                  })}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("firstName", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
              <div className="col-6">
                <TextInput
                  labelText="Last Name"
                  placeholder="Last Name"
                  required
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("lastName", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <TextInput
                  labelText="Doctors Specialty"
                  placeholder="Doctors Speacialty"
                  required
                  {...register("specialty", {
                    required: "Specialty is required",
                  })}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("specialty", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
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
                    required: "Specialty is required",
                  })}
                  onChange={(evt) => {
                    const target = evt.target;
                    setValue("clinicName", target.value, {
                      shouldValidate: true,
                    });
                  }}
                />
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
                <TextInput
                  labelText="State"
                  placeholder="State"
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
              onClick={() => console.log("clicked")}
              buttonText="Submit"
              className="bg-primary-light text-white mt-5 max-w-fit"
              type="submit"
            />
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default AddDoctors;
