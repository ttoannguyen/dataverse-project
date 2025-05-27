import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import Data from "./components/dataverse/Data";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dataverse" element={<Data />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
