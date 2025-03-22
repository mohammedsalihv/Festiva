import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";

const App: React.FC = () => {
  return <AppLayout />;
};

const AppLayout = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<UserRoutes />} />
      </Routes>
    </Router>
  );
};

export default App;
