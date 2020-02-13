import React, { useState } from "react";
import axios from "axios";

const LoginPage = props => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = event => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      const token = await axios
        .post("http://localhost:8080/api/login_check", credentials)
        .then(response => response.data.token);

      setError("");

      //   Stockage du token dans le localStorage
      window.localStorage.setItem("authToken", token);
      // On prévient axios qu'on a maintenant un hader par default sur toutes nos futurs requêtes HTTP
      axios.defaults.headers["Authorization"] = "Bearer " + token;
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
