// Les imports importants
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import NavBar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import AuhtContext from "./contexts/AuhtContext";
import CustomersPage from "./pages/CustomersPage";
import HomePage from "./pages/HomePage";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";
import CustomerPage from "./pages/CustomerPage";

require("../css/app.css");

AuthAPI.setup();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  const NavBarWithRooter = withRouter(NavBar);

  return (
    <AuhtContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      <HashRouter>
        <NavBarWithRooter />

        <main className="container pt-5">
          <Switch>
            <PrivateRoute path="/customers/:id" component={CustomerPage} />
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
