import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Regístrate</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          className="auth__input"
          placeholder="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth__input"
          placeholder="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth__button" type="submit">Regístrate</button>
      </form>
      <Link to="/signin" className="auth__link">¿Ya eres miembro? Inicia sesión aquí</Link>
    </div>
  );
}

export default Register;