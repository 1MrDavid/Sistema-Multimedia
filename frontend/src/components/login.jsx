import React, { useState } from "react";
import { loginUser } from "../api/authService";
import { Link } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { username, password };
      const response = await loginUser(userData);
      console.log(response);
      setMessage("Usuario logeado exitosamente.");
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(error.detail || "Error al iniciar sesión.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Iniciar Sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* Campo de nombre de usuario */}
        <div className="input-group">
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Ingresa tu nombre de usuario"
            required
          />
        </div>

        {/* Campo de contraseña */}
        <div className="input-group password-input">
          <label htmlFor="password">Contraseña:</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
          <button
            type="button"
            className="eye-icon"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </button>
        </div>

        {/* Botón de inicio de sesión */}
        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>

        {/* Mensaje de error/éxito */}
        {message && (
          <p className={`message ${message.includes("éxito") ? "success" : ""}`}>
            {message}
          </p>
        )}
      </form>

      {/* Enlace de registro */}
      <p className="register-link">
        ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>

  );
};

export default Login;