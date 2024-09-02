import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import CountryDetails from "./components/Pages/CountryDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:name" element={<CountryDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
