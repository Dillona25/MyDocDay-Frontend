import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDoctorStore } from "../../../store/useDoctors";
import { useClinicStore } from "../../../store/useClinics";
import { useEffect, useMemo } from "react";
import locationDot from "../../../assets/location-dot.svg";
import clinicIcon from "../../../assets/hospital-solid-full.svg";
import EditDoctorsForm from "../../../components/forms/common/EditDoctorForm";
import Button from "../../../components/common/Button";
import ModalConfirmationMessage from "../../../components/modals/ModalConfirmationMessage";
import { useModal } from "../../../store/modalContext";
import { deleteDoctor } from "../../../api/doctorApi";
import { deleteClinic } from "../../../api/clinicApi";
import { useToastStore } from "../../../store/useToast";

const EditDoctorPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isClinic = searchParams.get("type") === "clinic";
  const { doctors, initDoctors } = useDoctorStore();
  const { clinics, initClinics } = useClinicStore();
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    if (isClinic) {
      initClinics();
    } else {
      initDoctors();
    }
  }, [isClinic, initDoctors, initClinics]);

  const doctor = useMemo(() => {
    const list = isClinic ? clinics : doctors;
    return list.find(
      (entry) => String(isClinic ? entry.clinic_id : entry.id) === String(id),
    );
  }, [isClinic, doctors, clinics, id]);

  const handleRemoveDoctor = async () => {
    try {
      if (isClinic) {
        await deleteClinic({ id });
      } else {
        await deleteDoctor({ id });
      }
      closeModal();
      navigate("/dashboard/providers/");
      setTimeout(() => {
        showToast({
          title: isClinic ? "Clinic Removed" : "Doctor Removed",
          message: `The ${isClinic ? "clinic" : "doctor"} was removed successfully.`,
          titleClass: "text-success",
        });
      }, 150);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center border-bottom border-3 border-primary pb-3">
            <h3 className="mt-0 mb-3 mb-md-0 text-left text-primary fw-semibold text-poppins">
              Edit{" "}
              {doctor?.first_name
                ? `${doctor.first_name} ${doctor.last_name}`
                : doctor?.clinic_name}
            </h3>
          </div>
        </div>
      </div>

      <div className="row justify-content-center justify-content-md-between pt-5">
        <div className="col-10 col-md-3 mb-5 mb-md-0">
          <div className="d-flex flex-column">
            {doctor?.image_url ? (
              <img
                className="dr-profile-image-lg rounded-circle object-fit-cover flex-shrink-0 mx-auto"
                alt="Dr Profile Image"
                src={doctor?.image_url}
              />
            ) : (
              <div className="bg-light mx-auto rounded-circle d-flex align-items-center justify-content-center dr-profile-image-lg object-fit-cover flex-shrink-0">
                <span className="h2 fw-semibold m-0 text-body">
                  {doctor?.first_name && doctor?.last_name
                    ? `${doctor.first_name[0]}${doctor.last_name[0]}`
                    : doctor?.clinic_name?.slice(0, 2)}
                </span>
              </div>
            )}
            <h5 className="text-body text-center mt-4">
              {doctor?.first_name
                ? `${doctor.first_name} ${doctor.last_name}`
                : doctor?.clinic_name}
            </h5>
            <span className="text-center">{doctor?.specialty}</span>
            <div className="d-flex flex-column mt-4">
              {doctor?.clinic_name && (
                <div className="d-flex gap-2">
                  <img
                    src={clinicIcon}
                    alt="Dot Icon"
                    className="img-fluid icon"
                  />
                  <span>{doctor?.clinic_name}</span>
                </div>
              )}
              {doctor?.city && doctor?.state ? (
                <div className="d-flex gap-2 mt-2">
                  <img
                    src={locationDot}
                    alt="Dot Icon"
                    className="img-fluid icon"
                  />
                  <span>
                    {doctor?.city}, {doctor?.state}
                  </span>
                </div>
              ) : (
                ""
              )}
            </div>

            <Button
              onClick={openModal}
              buttonText={
                doctor?.first_name ? "Remove Doctor" : "Remove Clinic"
              }
              className="mt-5"
            />
          </div>
        </div>
        <div className="col-12 col-md-8">
          <EditDoctorsForm initialValues={doctor} />
        </div>
      </div>
      <ModalConfirmationMessage
        handleSubmit={handleRemoveDoctor}
        message={`Are you sure you want to remove this ${doctor?.first_name ? "doctor" : "clinic"}?`}
        submessage={`Note: All data and appointments associated with this ${doctor?.first_name ? "doctor" : "clinic"} will be deleted.`}
      />
    </>
  );
};

export default EditDoctorPage;
