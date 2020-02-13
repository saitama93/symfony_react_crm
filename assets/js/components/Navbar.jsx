import React from "react";
import authAPI from "../services/authAPI";
const NavBar = props => {
  const handleLogout = () => {
    authAPI.logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="#">
        SimReact
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor02"
        aria-controls="navbarColor02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Clients
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Factures
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto list-unstyled">
          <li className="nav-item">
            <a href="#" className="nav-link">
              Inscription
            </a>
          </li>

          <li className="nav-item">
            <a href="#" className="btn btn-success">
              Connexion !
            </a>
          </li>

          <li className="nav-item">
            <button className="btn btn-danger" onClick={handleLogout}>
              Déconnection
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
