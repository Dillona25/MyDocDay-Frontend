import { Link } from "react-router-dom";
import AppointmentCard from "../../components/common/AppointmentCard";
import Button from "../../components/common/Button";
import ModalAddAppointment from "../../components/modals/ModalAddAppointment";
import { useModal } from "../../store/modalContext";
import { useOnboarding } from "../../store/onboardingStepsContext";
import { useAppointments } from "../../store/usersAppointmentsContext";
import { useDoctors } from "../../store/usersDoctorsContext";

const OnboardingAppointments = () => {
  const { openModal } = useModal();
  const { appointments } = useAppointments();
  const { doctors } = useDoctors();
  const { prevStep } = useOnboarding();

  return (
    <>
      <div className="row justify-content-center" id="onboarding-appointments">
        <div className="col-12 col-xl-8 d-flex flex-column mb-5 md-md-0">
          <h4 className="font-poppins text-secondary text-center preheading">
            Finally
          </h4>
          <h1 className="font-poppins text-primary fw-bold text-center">
            Let’s Add Your Appointments!
          </h1>
          <p className="font-inter mt-4 text-center w-75 mx-auto mb-5">
            Here, we can go ahead and begin adding your upcoming appointments.
            You can also skip this step and add them later if you would prefer.
          </p>

          <h4 className="font-poppins text-primary fw-semibold doctors-heading pb-2 mb-4">
            Your Upcoming Appointments
          </h4>
          <div className="row">
            {appointments.length > 0 ? (
              appointments.map((apt) => {
                const doctor = doctors.find((d) => d.id === apt.doctor_id);
                const clinicName =
                  doctor?.clinic_name || "Clinic not available";

                return (
                  <div className="col-12 col-md-6 mb-3" key={apt.id}>
                    <AppointmentCard
                      doctorName={apt.doctor_name}
                      aptType={apt.appointment_type}
                      aptTitle={apt.appointment_title}
                      aptTime={apt.appointment_time}
                      aptDate={apt.appointment_date}
                      aptLocation={clinicName}
                    />
                  </div>
                );
              })
            ) : (
              <div className="col-12">
                <h5 className="text-body fw-semibold text-center my-5">
                  Add your first doctor appointment to see it here
                </h5>
              </div>
            )}
          </div>
          <Button
            buttonText="Add Appointment"
            className="bg-primary-light text-white mt-3 mb-5 max-w-fit mx-auto"
            onClick={openModal}
          />
          <div className="d-flex justify-content-between mt-auto">
            <Button
              buttonText="Previous Step"
              className="bg-transparent text-body text-decoration-underline mt-5 max-w-fit"
              onClick={prevStep}
            />
            <Link to="/dashboard/" className="mt-5">
              <Button
                buttonText="Next Step"
                className="bg-primary-light text-white max-w-fit"
              />
            </Link>
          </div>
        </div>
      </div>
      <ModalAddAppointment />
    </>
  );
};

export default OnboardingAppointments;
