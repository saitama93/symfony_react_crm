// Les imports importants
import React from "react";
import ReactDOM from "react-dom";

require("../css/app.css");
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";

AuthAPI.setup();

const App = () => {
  return (
    <HashRouter>
      <NavBar />

      <main className="container pt-5">
        <Switch>
          <Route path="/customers" component={CustomersPage} />
          <Route path="/invoices" component={InvoicesPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");

ReactDOM.render(<App />, rootElement);
