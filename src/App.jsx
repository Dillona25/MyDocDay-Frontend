import { useEffect } from "react";
import { AppRoutes } from "./routes/AppRoutes";
import { useAuthStore } from "./store/useAuth";

function App() {
  // Getting our user as soon as possible!
  useEffect(() => {
    useAuthStore.getState().initAuth();
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;
