import { useEffect } from "react";
import Button from "../../../components/common/Button";
import DoctorCard from "../../../components/common/DoctorCard";
import { useAuthStore } from "../../../store/useAuth";
import { useDoctorStore } from "../../../store/useDoctors";
import { useClinicStore } from "../../../store/useClinics";
import { useModal } from "../../../store/modalContext";
import ModalAddDoctor from "../../../components/modals/ModalAddDoctor";

const DoctorsPage = () => {
  const { doctors, initDoctors } = useDoctorStore();
  const { clinics, initClinics } = useClinicStore();
  const { user } = useAuthStore();
  const { openModal } = useModal();

  useEffect(() => {
    initDoctors();
    initClinics();
  }, [initDoctors, initClinics]);

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
              buttonText="Add Provider"
              className="max-w-fit bg-primary-light text-white align-self-center"
            />
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 mb-3">
          <h5 className="text-body fw-semibold border-bottom pb-2">Doctors</h5>
        </div>
        {doctors.length > 0 ? (
          doctors.map((doc) => (
            <div className="col-12 col-md-6 col-xl-4 mb-3" key={doc.id}>
              <DoctorCard
                firstName={doc.first_name}
                lastName={doc.last_name}
                image={doc.image_url}
                specialty={doc.specialty}
                clinicName={doc.clinic_name}
                docId={doc.id}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-body text-center my-3">No doctors added yet.</p>
          </div>
        )}
      </div>

      <div className="row mt-4">
        <div className="col-12 mb-3">
          <h5 className="text-body fw-semibold border-bottom pb-2">Clinics</h5>
        </div>
        {clinics.length > 0 ? (
          clinics.map((clinic) => (
            <div
              className="col-12 col-md-6 col-xl-4 mb-3"
              key={clinic.clinic_id}
            >
              <DoctorCard
                image={clinic.image_url}
                specialty={clinic.specialty}
                clinicName={clinic.clinic_name}
                docId={clinic.clinic_id}
              />
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-body text-center my-3">No clinics added yet.</p>
          </div>
        )}
      </div>
      <ModalAddDoctor />
    </>
  );
};

export default DoctorsPage;
