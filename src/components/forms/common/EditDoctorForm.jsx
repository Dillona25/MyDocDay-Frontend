import FormWrapper from "../../common/FormWrapper";
import { SelectInput, TextInput } from "../../common/Inputs";
import Button from "../../common/Button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { US_STATES } from "../../../data/constants";
import { updateDoctor } from "../../../api/doctorApi";
import { updateClinic, createClinic } from "../../../api/clinicApi";
import { useDoctorStore } from "../../../store/useDoctors";
import { useClinicStore } from "../../../store/useClinics";
import { useAuthStore } from "../../../store/useAuth";
import { useToastStore } from "../../../store/useToast";

const EditDoctorsForm = ({ initialValues }) => {
  const { initDoctors } = useDoctorStore();
  const { clinics, initClinics } = useClinicStore();
  const { user } = useAuthStore();
  const showToast = useToastStore((state) => state.showToast);

  const isClinic = initialValues && !initialValues.first_name;

  // For doctor mode: select existing or add new clinic
  const [clinicMode, setClinicMode] = useState("existing");
  const [selectedClinicId, setSelectedClinicId] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      // Doctor fields
      first_name: "",
      last_name: "",
      image_url: "",
      // Shared
      specialty: "",
      // Clinic-only fields (used when isClinic)
      clinic_name: "",
      clinic_email: "",
      clinic_phone: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
      // New clinic fields (used when doctor adds a new clinic)
      new_clinic_name: "",
      new_clinic_email: "",
      new_clinic_phone: "",
      new_clinic_street: "",
      new_clinic_city: "",
      new_clinic_state: "",
      new_clinic_zipcode: "",
    },
  });

  useEffect(() => {
    initClinics();
  }, [initClinics]);

  useEffect(() => {
    if (initialValues) {
      reset({
        first_name: initialValues.first_name || "",
        last_name: initialValues.last_name || "",
        image_url: initialValues.image_url || "",
        specialty: initialValues.specialty || "",
        clinic_name: initialValues.clinic_name || "",
        clinic_email: initialValues.clinic_email || "",
        clinic_phone: initialValues.clinic_phone || "",
        street: initialValues.street || "",
        city: initialValues.city || "",
        state: initialValues.state || "",
        zipcode: initialValues.zipcode || "",
      });

      // Pre-select current clinic if one is linked
      if (initialValues.clinic_id) {
        setSelectedClinicId(String(initialValues.clinic_id));
      }
    }
  }, [initialValues, reset]);

  const onSubmit = async (data) => {
    try {
      if (isClinic) {
        // Editing a standalone clinic — send changed fields directly
        const changes = Object.keys(dirtyFields).reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {});

        if (Object.keys(changes).length === 0) {
          console.log("No changes detected.");
          return;
        }

        await updateClinic({ id: initialValues.clinic_id, data: changes });
        initClinics();
      } else {
        // Editing a doctor — only include actual doctor fields
        const doctorChanges = Object.keys(dirtyFields).reduce((acc, key) => {
          if (
            !key.startsWith("new_clinic_") &&
            !["clinic_name", "clinic_email", "clinic_phone", "street", "city", "state", "zipcode"].includes(key)
          ) {
            acc[key] = data[key];
          }
          return acc;
        }, {});

        if (clinicMode === "existing") {
          if (!selectedClinicId) {
            showToast({ title: "No Clinic Selected", message: "Please select a clinic from the list.", titleClass: "text-danger" });
            return;
          }
          doctorChanges.clinic_id = Number(selectedClinicId);
        } else if (clinicMode === "new") {
          const clinicRes = await createClinic({
            user_id: user?.id,
            specialty: data.specialty,
            clinic_name: data.new_clinic_name,
            clinic_email: data.new_clinic_email,
            clinic_phone: data.new_clinic_phone,
            street: data.new_clinic_street,
            city: data.new_clinic_city,
            state: data.new_clinic_state,
            zipcode: data.new_clinic_zipcode,
          });

          // Handle multiple possible response shapes from the backend
          const newClinicId =
            clinicRes?.clinic?.clinic_id ??
            clinicRes?.clinic?.id ??
            clinicRes?.clinic_id ??
            clinicRes?.id;

          console.log("[EditDoctorForm] createClinic response:", clinicRes, "resolved clinic_id:", newClinicId);

          if (!newClinicId) {
            showToast({ title: "Error", message: "Clinic was created but could not be linked. Check console for details.", titleClass: "text-danger" });
            return;
          }

          doctorChanges.clinic_id = newClinicId;
          initClinics();
        }

        console.log("[EditDoctorForm] Patching doctor with:", doctorChanges);

        await updateDoctor({ id: initialValues.id, data: doctorChanges });
        initDoctors();
      }

      showToast({
        title: "Updated Successfully",
        message: "Updated successfully.",
        titleClass: "text-success",
      });
    } catch (error) {
      console.error("PATCH error:", error);
    }
  };

  const clinicOptions = clinics.map((c) => ({
    value: String(c.clinic_id),
    label: c.clinic_name,
  }));

  return (
    <FormWrapper id="edit-doctor-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        {/* Doctor fields — only shown for doctor entries */}
        {!isClinic && (
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
              <div className="col-12 text-center">
                <TextInput
                  labelText="Doctor's Image"
                  placeholder="Doctor's Image URL"
                  {...register("image_url")}
                />
                <span className="small text-body mt-1">
                  Note: Most doctors have public images on Google. Copy and
                  paste a valid image URL here.
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Clinic section */}
        <div className={`col-12 ${!isClinic ? "col-lg-6" : ""}`}>
          <div className="row mb-3">
            <div className="col-12">
              <h5 className="border-bottom pb-2">Clinic Information</h5>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12">
              <TextInput
                labelText="Specialty"
                placeholder={isClinic ? "e.g. Dentistry" : "e.g. Cardiology"}
                required
                {...register("specialty")}
              />
            </div>
          </div>

          {isClinic ? (
            // Standalone clinic — edit fields directly
            <>
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
                    {...register("street")}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-4">
                  <TextInput labelText="City" placeholder="City" {...register("city")} />
                </div>
                <div className="col-4">
                  <SelectInput
                    labelText="State"
                    options={US_STATES}
                    defaultOptionText="State"
                    {...register("state")}
                  />
                </div>
                <div className="col-4">
                  <TextInput labelText="Zipcode" placeholder="Zipcode" {...register("zipcode")} />
                </div>
              </div>
            </>
          ) : (
            // Doctor — select or create a clinic to link
            <div className="row mb-4">
              <div className="col-12">
                {initialValues?.clinic_name && (
                  <p className="small text-muted mb-2">
                    Currently linked to: <strong>{initialValues.clinic_name}</strong>
                  </p>
                )}
                <div className="btn-group w-100 mb-3" role="group">
                  <button
                    type="button"
                    className={`btn btn-sm ${clinicMode === "existing" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => {
                      setClinicMode("existing");
                      setSelectedClinicId(initialValues?.clinic_id ? String(initialValues.clinic_id) : "");
                    }}
                  >
                    Select Existing Clinic
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${clinicMode === "new" ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => { setClinicMode("new"); setSelectedClinicId(""); }}
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
                        onClick={() => setClinicMode("new")}
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
                          {...register("new_clinic_name")}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-6">
                        <TextInput
                          labelText="Clinic's Email"
                          placeholder="Clinic's Email"
                          {...register("new_clinic_email")}
                        />
                      </div>
                      <div className="col-6">
                        <TextInput
                          labelText="Clinic's Phone"
                          placeholder="Clinic's Phone"
                          {...register("new_clinic_phone")}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-12">
                        <TextInput
                          labelText="Street Address"
                          placeholder="Street Address"
                          {...register("new_clinic_street")}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <TextInput labelText="City" placeholder="City" {...register("new_clinic_city")} />
                      </div>
                      <div className="col-4">
                        <SelectInput
                          labelText="State"
                          options={US_STATES}
                          defaultOptionText="State"
                          {...register("new_clinic_state")}
                        />
                      </div>
                      <div className="col-4">
                        <TextInput labelText="Zipcode" placeholder="Zipcode" {...register("new_clinic_zipcode")} />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-12 d-flex justify-content-end">
          <Button
            buttonText="Submit"
            type="submit"
            className="bg-primary-light max-w-fit text-white align-self-end"
          />
        </div>
      </div>
    </FormWrapper>
  );
};

export default EditDoctorsForm;
