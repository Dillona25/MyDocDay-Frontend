import FormWrapper from "../../../components/common/FormWrapper";
import { SelectInput, TextInput } from "../../../components/common/Inputs";
import Button from "../../common/Button";
import { useDoctorStore } from "../../../store/useDoctors";
import { useForm } from "react-hook-form";
import { useToastStore } from "../../../store/useToast";
import { useEffect } from "react";
import { editAppointment } from "../../../api/appointmentsApi";
import { useAppointmentStore } from "../../../store/useAppointments";

const EditAppointmentsForm = ({ initialValues }) => {
  const { doctors } = useDoctorStore();
  const { initAppointments } = useAppointmentStore();

  const showToast = useToastStore((state) => state.showToast);
  // Formatting the passed date so we can use it for the default date value on our "date" field
  const formattedDate = initialValues?.appointment_date
    ? new Date(initialValues.appointment_date).toISOString().split("T")[0]
    : "";
  const aptTypes = [
    {
      value: "In-Person",
      label: "In-Person",
    },
    {
      value: "Telehealth",
      label: "Telehealth",
    },
  ];

  // Building our doctor options. The label is the doctors name, but the value is their unique ID
  const doctorOptions = doctors.map((doc) => ({
    value: String(doc.id),
    label: `${doc.first_name} ${doc.last_name}`,
  }));

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, dirtyFields },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      appointment_title: "",
      doctor_id: "",
      appointment_date: formattedDate,
      appointment_time: "",
      appointment_type: "",
    },
  });

  // Here we are setting our form values to
  // If we have initial values then we need to reset our defaultValues with the appointments details
  // Our dependency array says reset when initialValues has changed
  useEffect(() => {
    if (initialValues) {
      reset({
        appointment_title: initialValues.appointment_title,
        doctor_id: initialValues.doctor_id
          ? String(initialValues.doctor_id)
          : "",
        appointment_date: formattedDate,
        appointment_time: initialValues.appointment_time,
        appointment_type: initialValues.appointment_type,
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
      const result = await editAppointment({
        id: initialValues.id,
        data: changes,
      });
      initAppointments();
    } catch (error) {
      console.error("PATCH error:", error);
    }
  };

  return (
    <>
      <FormWrapper className="mb-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-4">
          <div className="col-12">
            <TextInput
              labelText="Appointment Title"
              placeholder="Appointment Title"
              {...register("appointment_title")}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <SelectInput
              id="doctor-select"
              labelText="Select Doctor"
              options={doctorOptions}
              defaultOptionText="Select Doctor"
              {...register("doctor_id")}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-6">
            <TextInput
              name="date"
              type="date"
              labelText="Appointment Date"
              {...register("appointment_date")}
            />
          </div>
          <div className="col-6">
            <TextInput
              type="time"
              labelText="Appointment Time"
              {...register("appointment_time")}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <SelectInput
              name="aptType"
              id="appointment-type-select"
              labelText="Select appointment type"
              options={aptTypes}
              defaultOptionText="Select Appointment Type"
              {...register("appointment_type")}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-end">
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

export default EditAppointmentsForm;
