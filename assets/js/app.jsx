// Les imports importants
import React from "react";
import ReactDOM from "react-dom";
/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "../css/app.css";
import NavBar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route } from "react-router-dom";
import CustomersPage from "./pages/CustomersPage";
import CustomersPageWithPagination from "./pages/CustomersPageWithPagination";
import InvoicesPage from "./pages/InvoicesPage";
import LoginPage from "./pages/LoginPage";

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
