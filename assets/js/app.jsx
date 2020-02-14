// Les imports importants
import React, { useState } from "react";
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

AuthAPI.setup();

const PrivateRoute = ({ path, isAuthenticated, component }) =>
  isAuthenticated ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    AuthAPI.isAuthenticated()
  );

  const NavBarWithRooter = withRouter(NavBar);

  return (
    <HashRouter>
      <NavBarWithRooter
        isAuthenticated={isAuthenticated}
        onLogout={setIsAuthenticated}
      />

      <main className="container pt-5">
        <Switch>
          <PrivateRoute
            path="/customers"
            isAuthenticated={isAuthenticated}
            component={CustomersPage}
          />

          <PrivateRoute
            path="/invoices"
            component={InvoicesPage}
            isAuthenticated={isAuthenticated}
          />
          <Route
            path="/login"
            render={props => (
              <LoginPage onLogin={setIsAuthenticated} {...props} />
            )}
          />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);
