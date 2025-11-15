import { useEffect } from "react";
import Button from "../../../components/common/Button";
import DoctorCard from "../../../components/common/DoctorCard";
import { useAuthStore } from "../../../store/useAuth";
import { useDoctorStore } from "../../../store/useDoctors";
import { useModal } from "../../../store/modalContext";
import ModalAddDoctor from "../../../components/modals/ModalAddDoctor";

const DoctorsPage = () => {
  const { doctors, initDoctors } = useDoctorStore();
  const { user } = useAuthStore();
  const { openModal } = useModal();

  useEffect(() => {
    initDoctors();
  }, [initDoctors]);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center border-bottom border-3 border-primary pb-3">
            <h3 className="mt-0 mb-3 mb-md-0 text-left text-primary fw-semibold text-poppins">
              {user.first_name}'s Doctors
            </h3>
            <Button
              onClick={openModal}
              buttonText="Add Doctor"
              className="max-w-fit bg-primary-light text-white align-self-center"
            />
          </div>
        </div>
      </div>

      <div className="row mt-5">
        {doctors.length > 0 ? (
          doctors.map((doc) => (
            <div className="col-12 col-md-6 col-xl-4 mb-3" key={doc.id}>
              <DoctorCard
                firstName={doc.first_name}
                lastName={doc.last_name}
                image={doc.image_url}
                specialty={doc.specialty}
                clinicName={doc.clinic_name}
                city={doc.city}
                state={doc.state}
                docId={doc.id}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <h5 className="text-body fw-semibold text-center my-5">
              You currently have no added doctors. When you do, they will appear
              here.
            </h5>
          </div>
        )}
      </div>
      <ModalAddDoctor />
    </>
  );
};

export default DoctorsPage;
