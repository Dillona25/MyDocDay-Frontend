import FormWrapper from "../../common/FormWrapper";
import { SelectInput, TextInput } from "../../common/Inputs";
import Button from "../../common/Button";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { US_STATES } from "../../../data/constants";
import { updateDoctor } from "../../../api/doctorApi";
import { useDoctorStore } from "../../../store/useDoctors";

const EditDoctorsForm = ({ initialValues }) => {
  const { initDoctors } = useDoctorStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      first_name: "",
      last_name: "",
      specialty: "",
      image_url: "",
      clinic_name: "",
      clinic_email: "",
      clinic_phone: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({
        first_name: initialValues.first_name || "",
        last_name: initialValues.last_name || "",
        specialty: initialValues.specialty || "",
        image_url: initialValues.image_url || "",
        clinic_name: initialValues.clinic_name || "",
        clinic_email: initialValues.clinic_email || "",
        clinic_phone: initialValues.clinic_phone || "",
        street: initialValues.street || "",
        city: initialValues.city || "",
        state: initialValues.state || "",
        zipcode: initialValues.zipcode || "",
      });
    }
  }, [initialValues, reset]);

  const onSubmit = async (data) => {
    // Get only the fields that were changed
    const changes = Object.keys(dirtyFields).reduce((acc, key) => {
      acc[key] = data[key];
      return acc;
    }, {});

    if (Object.keys(changes).length === 0) {
      console.log("No changes detected.");
      return;
    }

    try {
      const result = await updateDoctor({
        id: initialValues.id,
        data: changes,
      });
      initDoctors();
    } catch (error) {
      console.error("PATCH error:", error);
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
                  {...register("first_name")}
                />
              </div>
              <div className="col-6">
                <TextInput
                  labelText="Last Name"
                  placeholder="Last Name"
                  {...register("last_name")}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12">
                <TextInput
                  labelText="Doctors Specialty"
                  placeholder="Doctors Speacialty"
                  {...register("specialty")}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-12 text-center">
                <TextInput
                  labelText="Doctors Image"
                  placeholder="Doctors Image"
                  {...register("image_url")}
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
                  {...register("clinic_name")}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-6">
                <TextInput
                  labelText="Clinic's Email"
                  placeholder="Clinic's Email"
                  {...register("clinic_email")}
                />
              </div>
              <div className="col-6">
                <TextInput
                  labelText="Clinic's Phone"
                  placeholder="Clinic's Phone"
                  {...register("clinic_phone")}
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
                />
              </div>
              <div className="col-4">
                <TextInput
                  labelText="City"
                  placeholder="City"
                  {...register("city")}
                />
              </div>
              <div className="col-4">
                <SelectInput
                  labelText="State"
                  placeholder="State"
                  options={US_STATES}
                  defaultOptionText="State"
                  {...register("state")}
                />
              </div>
              <div className="col-4">
                <TextInput
                  labelText="Zipcode"
                  placeholder="Zipcode"
                  {...register("zipcode")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <Button
              buttonText="Submit"
              type="submit"
              className="bg-primary-light max-w-fit bg-primary-light text-white align-self-end"
            />
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default EditDoctorsForm;
