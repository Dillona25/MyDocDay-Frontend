import { useState } from "react";
import FormWrapper from "../../../components/common/FormWrapper";
import { SelectInput, TextInput } from "../../../components/common/Inputs";
import Button from "../../common/Button";
import { mockApi } from "../../../api/authApi";
import { useDoctorStore } from "../../../store/useDoctors";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../../../store/useAuth";
import { createAppointment } from "../../../api/appointmentsApi";
import { useModal } from "../../../store/modalContext";
import { useAppointmentStore } from "../../../store/useAppointments";

const AddAppointments = () => {
  const { doctors } = useDoctorStore();
  const { user } = useAuthStore();
  const { closeModal } = useModal();
  const { addAppointmentToList } = useAppointmentStore();

  const doctorOptions = doctors.map((doc) => ({
    value: String(doc.id),
    label: `${doc.first_name} ${doc.last_name}`,
  }));

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

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      appointmentTitle: "",
      doctor: "",
      appointmentDate: "",
      appointmentTime: "",
      appointmentType: "",
    },
  });

  const onSubmit = async (values) => {
    const selectedDoctor = doctors.find(
      (doc) => String(doc.id) === values.doctor
    );

    const payload = {
      user_id: user?.id,
      doctor_id: Number(values.doctor),
      doctor_name: selectedDoctor
        ? `${selectedDoctor.first_name} ${selectedDoctor.last_name}`
        : "",
      appointment_title: values.appointmentTitle,
      appointment_type: values.appointmentType,
      appointment_date: values.appointmentDate,
      appointment_time: values.appointmentTime,
    };

    try {
      const res = await createAppointment(payload);
      addAppointmentToList(res.appointment);
      console.log({ ...res.appointment });
      closeModal();
    } catch (error) {
      console.error("Registration failed:", error);
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
              required
              {...register("appointmentTitle", {
                required: "This field is required",
              })}
              onChange={(evt) => {
                const target = evt.target;
                setValue("appointmentTitle", target.value, {
                  shouldValidate: true,
                });
              }}
            />
            {errors.appointmentTitle && (
              <span className="text-danger small">
                {errors.appointmentTitle.message}
              </span>
            )}
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-12">
            <SelectInput
              id="doctor-select"
              labelText="Select Doctor"
              options={doctorOptions}
              defaultOptionText="Select Doctor"
              required
              {...register("doctor", {
                required: "This field is required",
              })}
              onChange={(evt) => {
                const target = evt.target;
                setValue("doctor", target.value, {
                  shouldValidate: true,
                });
              }}
            />
            {errors.doctor && (
              <span className="text-danger small">{errors.doctor.message}</span>
            )}
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-6">
            <TextInput
              name="date"
              type="date"
              labelText="Appointment Date"
              required
              {...register("appointmentDate", {
                required: "This field is required",
              })}
              onChange={(evt) => {
                const target = evt.target;
                setValue("appointmentDate", target.value, {
                  shouldValidate: true,
                });
              }}
            />
            {errors.appointmentDate && (
              <span className="text-danger small">
                {errors.appointmentDate.message}
              </span>
            )}
          </div>
          <div className="col-6">
            <TextInput
              type="time"
              labelText="Appointment Time"
              required
              {...register("appointmentTime", {
                required: "This field is required",
              })}
              onChange={(evt) => {
                const target = evt.target;
                setValue("appointmentTime", target.value, {
                  shouldValidate: true,
                });
              }}
            />
            {errors.appointmentTime && (
              <span className="text-danger small">
                {errors.appointmentTime.message}
              </span>
            )}
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
              {...register("appointmentType")}
              onChange={(evt) => {
                const target = evt.target;
                setValue("appointmentType", target.value, {
                  shouldValidate: false,
                });
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-end">
            <Button
              disabled={!isValid}
              buttonText="Add Appointment"
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

export default AddAppointments;
