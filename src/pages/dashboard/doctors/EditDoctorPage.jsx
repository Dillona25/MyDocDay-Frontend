import { useParams } from "react-router-dom";
import { useDoctorStore } from "../../../store/useDoctors";
import { useEffect } from "react";

const EditDoctorPage = () => {
  const { id } = useParams();
  const { doctors, initDoctors } = useDoctorStore();

  useEffect(() => {
    initDoctors();
  }, [initDoctors]);

  // We can remove this, just like to have the console
  useEffect(() => {
    if (doctors.length) {
      const found = doctors.find((doc) => String(doc.id) === id);
      console.log("Found doctors:", found);
    }
  }, [doctors, id]);

  return (
    <div>
      <h2>EditDoctor</h2>
    </div>
  );
};

export default EditDoctorPage;
