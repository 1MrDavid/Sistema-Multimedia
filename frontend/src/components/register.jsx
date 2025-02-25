import React, { useState } from "react";
import { registerUser } from "../api/authService"; 
import { Link } from "react-router-dom";
// import "./styles.css"; 

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = { username, password };
      const response = await registerUser(userData);
      console.log(response);
      setMessage("Usuario registrado exitosamente.");
      setUsername("");
      setPassword("");
    } catch (error) {
      setMessage(error.detail || "Error al registrar el usuario.");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Registro de Usuario</h1>
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
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        {/* Botón de registro */}
        <button type="submit" className="login-button">
          Registrarse
        </button>

        {/* Mensaje de error/éxito */}
        {message && (
          <p className={`message ${message.includes("éxito") ? "success" : ""}`}>
            {message}
          </p>
        )}
      </form>

      {/* Enlace de inicio de sesión */}
      <p className="login-link">
        ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
};

export default Register;