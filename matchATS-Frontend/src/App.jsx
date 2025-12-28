import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import AnalyzeResume from "./pages/AnalyzeResume";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analyze" element={<AnalyzeResume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
