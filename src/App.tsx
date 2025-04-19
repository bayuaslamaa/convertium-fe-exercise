import { Suspense, lazy } from "react";
import "./App.css";

// Lazy load routes for better performance
const AppRoutes = lazy(() => import("./routes/AppRoutes"));

function App() {
  return (
    <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
      <div className="app-container">
        <AppRoutes />
      </div>
    </Suspense>
  );
}

export default App;
