
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardLayout from "./layouts/dashboardlayout";
import Dashboard from "./pages/dashboard";
import Students from "./pages/students";
import Settings from "./pages/settings";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
