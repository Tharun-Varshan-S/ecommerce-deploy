import { Suspense, lazy } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const AppRoutes = lazy(() => import("./routes/AppRoutes.jsx"));

const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <AppRoutes />
  </Suspense>
);

export default App;
