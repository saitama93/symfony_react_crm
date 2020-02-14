import React, { useState } from "react";
import AuthAPI from "../services/authAPI";

const LoginPage = ({ onLogin, history }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setCredentials({ ...credentials, [name]: value });
  };

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await AuthAPI.authenticate(credentials);
      setError("");
      onLogin(true);
      history.replace("/customers");
    } catch (error) {
      setError(
        "Aucun compte ne possède cette adresse email ou alors les information ne correspondent pas"
      );
    }
  };

  return (
    <>
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email</label>
          <input
            value={credentials.username}
            onChange={handleChange}
            type="email"
            className={"form-control" + (error && " is-invalid")}
            placeholder="Adresse email de connexion"
            name="username"
            id="username"
          />
          {error && <p className="invalid-feedback">{error}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            value={credentials.password}
            onChange={handleChange}
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            name="password"
            id="password"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Je me connecte
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
