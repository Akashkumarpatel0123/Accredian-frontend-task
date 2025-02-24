import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReferEarn from "./components/ReferEarn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReferEarn />} />
      </Routes>
    </Router>
  );
}

export default App;
