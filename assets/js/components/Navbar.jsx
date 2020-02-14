import React, { useContext } from "react";
import authAPI from "../services/authAPI";
import { NavLink } from "react-router-dom";
import AuthContext from "../contexts/AuhtContext";

const NavBar = ({ history }) => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    authAPI.logout();
    setIsAuthenticated(false);
    history.push("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <NavLink className="navbar-brand" to="/">
        SimReact
      </NavLink>
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
            <NavLink className="nav-link" to="/customers">
              Clients
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/invoices">
              Factures
            </NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto list-unstyled">
          {(!isAuthenticated && (
            <>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Inscription
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/login" className="btn btn-success">
                  Connexion !
                </NavLink>
              </li>
            </>
          )) || (
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleLogout}>
                Déconnection
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
