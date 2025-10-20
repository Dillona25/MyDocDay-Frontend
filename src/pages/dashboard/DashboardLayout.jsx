import Navigation from "../../components/common/Navigation";
import DoctorWidget from "../../components/widgets/DoctorWidget";

const DashboardLayout = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Navigation />
      <div className="container py-5">
        <div className="row mb-3">
          <div className="col-12">
            <h1 className="h2 text-primary text-poppins fw-semibold">
              Today is {formattedDate}
            </h1>
          </div>
        </div>
        <div className="row justify-content-between">
          <DoctorWidget />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
