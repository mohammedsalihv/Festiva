import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import HostRoutes from "./routes/HostRoutes";


const App: React.FC = () => {
  return <AppLayout />;
};

const AppLayout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
        <Route path="/host/*" element={<HostRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
