import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/init.scss";
import App from "./App.jsx";
import { DoctorProvider } from "./store/useDoctors.jsx";
import { ModalProvider } from "./store/modalContext.jsx";
import { AppointmentProvider } from "./store/useAppointments.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DoctorProvider>
      <AppointmentProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </AppointmentProvider>
    </DoctorProvider>
  </StrictMode>
);
