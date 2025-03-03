import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import PlayVideo from "./components/PlayVideo";
import "./style.css";

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
        <Route
          path="/video/:id"
          element={<ProtectedRoute element={PlayVideo} />}
        />
      </Routes>
    </Router>
  );
}

export default App;