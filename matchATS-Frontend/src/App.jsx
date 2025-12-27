import { useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./Components/Navbar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/LandingPage";
import Dummy from "./pages/Dummy";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dummy" element={<Dummy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
