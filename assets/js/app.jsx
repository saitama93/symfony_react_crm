// Les imports importants
import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";

require("../css/app.css");
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import {
  HashRouter,
  Switch,
  Route,
  withRouter,
  Redirect
} from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";
import AuhtContext from "./contexts/AuhtContext";

AuthAPI.setup();

const PrivateRoute = ({ path, component }) => {
  const { isAuthenticated } = useContext(AuhtContext);

  return isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  const NavBarWithRooter = withRouter(NavBar);

  const contextValue = {
    isAuthenticated,
    setIsAuthenticated
  };

  return (
    <AuhtContext.Provider value={contextValue}>
      <HashRouter>
        <NavBarWithRooter />

        <main className="container pt-5">
          <Switch>
            <PrivateRoute path="/customers" component={CustomersPage} />
            <PrivateRoute path="/invoices" component={InvoicesPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
    </AuhtContext.Provider>
  );
};

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);
