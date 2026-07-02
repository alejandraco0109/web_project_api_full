import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Iniciar sesión</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          placeholder="Correo electrónico"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth__input"
          placeholder="Contraseña"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth__button">
          Iniciar sesión
        </button>
        <Link to="/signup" className="auth__link">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
        <a href="https://freedns.afraid.org/" className="auth__link" target="_blank" rel="noopener noreferrer">
          "Free DNS"
        </a>
      </form>
    </div>
  );
}

export default Login;