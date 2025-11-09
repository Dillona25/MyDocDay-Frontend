import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { useAuthStore } from "./store/useAuth";
import MessageToast from "./components/common/MessageToast";

function App() {
  // Getting our user as soon as possible!
  useEffect(() => {
    useAuthStore.getState().initAuth();
  }, []);

  return (
    <>
      <AppRoutes />
      <MessageToast />
    </>
  );
}

export default App;
