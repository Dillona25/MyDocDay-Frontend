import FormWrapper from "../../common/FormWrapper";
import { SelectInput, TextInput } from "../../common/Inputs";
import Button from "../../common/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createDoctorWithClinic } from "../../../api/doctorApi";
import { createClinic } from "../../../api/clinicApi";
import { useAuthStore } from "../../../store/useAuth";
import { useDoctorStore } from "../../../store/useDoctors";
import { useClinicStore } from "../../../store/useClinics";
import { useModal } from "../../../store/modalContext";
import { US_STATES } from "../../../data/constants";
import { useToastStore } from "../../../store/useToast";

const AddDoctors = () => {
  const { user } = useAuthStore();
  const { initDoctors, addDoctorToList } = useDoctorStore();
  const { clinics, initClinics } = useClinicStore();
  const { closeModal } = useModal();
  const showToast = useToastStore((state) => state.showToast);

  // Doctor vs Clinic Only
  const [mode, setMode] = useState("doctor");
  // For doctor mode: link to existing clinic or create new one
  const [clinicMode, setClinicMode] = useState("existing");
  const [selectedClinicId, setSelectedClinicId] = useState("");

  useEffect(() => {
    initClinics();
  }, [initClinics]);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
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

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    trigger();
  };

  const handleClinicModeSwitch = (newMode) => {
    setClinicMode(newMode);
    setSelectedClinicId("");
    trigger();
  };

  const onSubmit = async (values) => {
    try {
      if (mode === "clinic") {
        const payload = {
          user_id: user?.id,
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
        await createClinic(payload);
        await initClinics();
      } else {
        // Doctor mode
        const basePayload = {
          user_id: user?.id,
          first_name: values.firstName,
          last_name: values.lastName,
          specialty: values.specialty,
          image_url: values.imageURL,
        };

        const clinicPayload =
          clinicMode === "existing"
            ? { clinic_id: Number(selectedClinicId) }
            : {
                clinic_name: values.clinicName,
                clinic_email: values.clinicEmail,
                clinic_phone: values.clinicPhone,
                street: values.street,
                city: values.city,
                state: values.state,
                zipcode: values.zipcode,
              };

        const res = await createDoctorWithClinic({
          ...basePayload,
          ...clinicPayload,
        });
        await initDoctors();
        addDoctorToList({
          ...res.doctor,
          clinic_name: res.clinic?.clinic_name ?? values.clinicName,
          city: res.clinic?.city ?? values.city,
          state: res.clinic?.state ?? values.state,
        });
      }

      closeModal();
      showToast({
        title: "Added Successfully",
        message: "Added to your account successfully",
        titleClass: "text-success",
      });
    } catch (error) {
      if (error.status === 500) {
        showToast({
          title: "Error Adding",
          message:
            "Something went wrong, but this looks to be on our end. Please try again later.",
          titleClass: "text-danger",
        });
      }
    }
  };

  const clinicOptions = clinics.map((c) => ({
    value: String(c.clinic_id),
    label: c.clinic_name,
  }));

  return (
    <>
      <div className="d-flex justify-content-center mb-4">
        <div className="btn-group" role="group" aria-label="Entry type">
          <button
            type="button"
            className={`btn ${mode === "doctor" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleModeSwitch("doctor")}
          >
            Doctor
          </button>
          <button
            type="button"
            className={`btn ${mode === "clinic" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleModeSwitch("clinic")}
          >
            Clinic Only
          </button>
        </div>
      </div>

      <FormWrapper id="add-doctor-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {mode === "doctor" && (
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
                      setValue("firstName", evt.target.value, { shouldValidate: true });
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
                    required
                    {...register("lastName", {
                      required: "This field is required",
                    })}
                    onChange={(evt) => {
                      setValue("lastName", evt.target.value, { shouldValidate: true });
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
                <div className="col-12 text-center">
                  <TextInput
                    labelText="Doctor's Image"
                    placeholder="Doctor's Image URL"
                    {...register("imageURL")}
                    onChange={(evt) => {
                      setValue("imageURL", evt.target.value, { shouldValidate: true });
                    }}
                  />
                  <span className="small text-body mt-1">
                    Note: Most doctors have public images on Google. Copy and
                    paste a valid image URL here.
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className={`col-12 ${mode === "doctor" ? "col-lg-6" : ""}`}>
            <div className="row mb-3">
              <div className="col-12">
                <h5 className="border-bottom pb-2">Clinic Information</h5>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <TextInput
                  labelText="Specialty"
                  placeholder={mode === "doctor" ? "e.g. Cardiology" : "e.g. Dentistry"}
                  required
                  {...register("specialty", {
                    required: "This field is required",
                  })}
                  onChange={(evt) => {
                    setValue("specialty", evt.target.value, { shouldValidate: true });
                  }}
                />
                {errors.specialty && (
                  <span className="text-danger small">
                    {errors.specialty.message}
                  </span>
                )}
              </div>
            </div>

            {mode === "doctor" && (
              <div className="row mb-4">
                <div className="col-12">
                  <div className="btn-group w-100 mb-3" role="group">
                    <button
                      type="button"
                      className={`btn btn-sm ${clinicMode === "existing" ? "btn-primary" : "btn-outline-primary"}`}
                      onClick={() => handleClinicModeSwitch("existing")}
                    >
                      Select Existing Clinic
                    </button>
                    <button
                      type="button"
                      className={`btn btn-sm ${clinicMode === "new" ? "btn-primary" : "btn-outline-primary"}`}
                      onClick={() => handleClinicModeSwitch("new")}
                    >
                      Add New Clinic
                    </button>
                  </div>

                  {clinicMode === "existing" ? (
                    clinicOptions.length > 0 ? (
                      <SelectInput
                        labelText="Select Clinic"
                        options={clinicOptions}
                        defaultOptionText="Select a clinic..."
                        value={selectedClinicId}
                        onChange={(evt) => setSelectedClinicId(evt.target.value)}
                      />
                    ) : (
                      <p className="small text-muted text-center mb-0">
                        No clinics added yet.{" "}
                        <button
                          type="button"
                          className="btn btn-link p-0 small"
                          onClick={() => handleClinicModeSwitch("new")}
                        >
                          Add one now.
                        </button>
                      </p>
                    )
                  ) : (
                    <>
                      <div className="row mb-3">
                        <div className="col-12">
                          <TextInput
                            labelText="Clinic Name"
                            placeholder="Clinic Name"
                            required
                            {...register("clinicName", {
                              required: "This field is required",
                            })}
                            onChange={(evt) => {
                              setValue("clinicName", evt.target.value, { shouldValidate: true });
                            }}
                          />
                          {errors.clinicName && (
                            <span className="text-danger small">
                              {errors.clinicName.message}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-6">
                          <TextInput
                            labelText="Clinic's Email"
                            placeholder="Clinic's Email"
                            {...register("clinicEmail")}
                            onChange={(evt) => {
                              setValue("clinicEmail", evt.target.value, { shouldValidate: true });
                            }}
                          />
                        </div>
                        <div className="col-6">
                          <TextInput
                            labelText="Clinic's Phone"
                            placeholder="Clinic's Phone"
                            {...register("clinicPhone")}
                            onChange={(evt) => {
                              setValue("clinicPhone", evt.target.value, { shouldValidate: true });
                            }}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <TextInput
                            labelText="Street Address"
                            placeholder="Street Address"
                            {...register("street")}
                            onChange={(evt) => {
                              setValue("street", evt.target.value, { shouldValidate: true });
                            }}
                          />
                        </div>
                        <div className="col-4">
                          <TextInput
                            labelText="City"
                            placeholder="City"
                            {...register("city")}
                            onChange={(evt) => {
                              setValue("city", evt.target.value, { shouldValidate: true });
                            }}
                          />
                        </div>
                        <div className="col-4">
                          <SelectInput
                            labelText="State"
                            options={US_STATES}
                            defaultOptionText="State"
                            {...register("state")}
                            onChange={(evt) => {
                              setValue("state", evt.target.value, { shouldValidate: true });
                            }}
                          />
                        </div>
                        <div className="col-4">
                          <TextInput
                            labelText="Zipcode"
                            placeholder="Zipcode"
                            {...register("zipcode")}
                            onChange={(evt) => {
                              setValue("zipcode", evt.target.value, { shouldValidate: true });
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {mode === "clinic" && (
              <>
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
                        setValue("clinicName", evt.target.value, { shouldValidate: true });
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
                        setValue("clinicEmail", evt.target.value, { shouldValidate: true });
                      }}
                    />
                  </div>
                  <div className="col-6">
                    <TextInput
                      labelText="Clinic's Phone"
                      placeholder="Clinic's Phone"
                      {...register("clinicPhone")}
                      onChange={(evt) => {
                        setValue("clinicPhone", evt.target.value, { shouldValidate: true });
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-12">
                    <TextInput
                      labelText="Street Address"
                      placeholder="Street Address"
                      {...register("street")}
                      onChange={(evt) => {
                        setValue("street", evt.target.value, { shouldValidate: true });
                      }}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <TextInput
                      labelText="City"
                      placeholder="City"
                      {...register("city")}
                      onChange={(evt) => {
                        setValue("city", evt.target.value, { shouldValidate: true });
                      }}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <SelectInput
                      labelText="State"
                      options={US_STATES}
                      defaultOptionText="State"
                      {...register("state")}
                      onChange={(evt) => {
                        setValue("state", evt.target.value, { shouldValidate: true });
                      }}
                    />
                  </div>
                  <div className="col-4 mt-3">
                    <TextInput
                      labelText="Zipcode"
                      placeholder="Zipcode"
                      {...register("zipcode")}
                      onChange={(evt) => {
                        setValue("zipcode", evt.target.value, { shouldValidate: true });
                      }}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Button
              disabled={
                !isValid ||
                (mode === "doctor" && clinicMode === "existing" && !selectedClinicId)
              }
              buttonText="Submit"
              type="submit"
              className={`${
                isValid && !(mode === "doctor" && clinicMode === "existing" && !selectedClinicId)
                  ? "bg-primary-light"
                  : "bg-light text-body"
              } max-w-fit text-white align-self-end`}
            />
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default AddDoctors;
