import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./styles/init.scss";
import App from "./App.jsx";
import { AuthProvider } from "./store/AuthContext.jsx";
import { DoctorProvider } from "./store/usersDoctorsContext.jsx";
import { ModalProvider } from "./store/modalContext.jsx";
import { AppointmentProvider } from "./store/usersAppointmentsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DoctorProvider>
        <AppointmentProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </AppointmentProvider>
      </DoctorProvider>
    </AuthProvider>
  </StrictMode>
);
