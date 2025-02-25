import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Interface from "./components/interfaces";
// import "./App.css";
import "./style.css";
// import "./components/interfacestyles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/Interface"
          element={<ProtectedRoute element={Dashboard} />}
        />
      </Routes>
    </Router>
  );
}

export default App;