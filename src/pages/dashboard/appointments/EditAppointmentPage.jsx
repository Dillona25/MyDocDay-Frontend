import { useEffect } from "react";
import { useAppointmentStore } from "../../../store/useAppointments";
import { useParams } from "react-router-dom";

const EditAppointmentPage = () => {
  const { appointments, initAppointments } = useAppointmentStore();
  const { id } = useParams();

  useEffect(() => {
    initAppointments();
  }, [initAppointments]);

  // We can remove this, just like to have the console
  useEffect(() => {
    if (appointments.length) {
      const found = appointments.find((apt) => String(apt.id) === id);
      console.log("Found appointment:", found);
    }
  }, [appointments, id]);

  return (
    <div>
      <h2>EditAppointment</h2>
    </div>
  );
};

export default EditAppointmentPage;
