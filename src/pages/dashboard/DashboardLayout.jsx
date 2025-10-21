import Navigation from "../../components/common/Navigation";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <>
      <Navigation />
      <main className="container py-5">
        <Outlet />
      </main>
    </>
  );
};

export default DashboardLayout;
