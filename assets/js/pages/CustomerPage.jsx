import React, { useState } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomerPage = props => {
  const [customer, setCustomer] = useState({
    lastName: "Roronoa",
    firstName: "Zoro",
    email: "",
    company: ""
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: ""
  });

  const handleChane = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/customers",
        customer
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <h1>Création d'un client</h1>

      <form onSubmit={handleSubmit}>
        <Field
          name="lastName"
          label="Nom de famille"
          placeholder="Nom de famille du client"
          value={customer.lastName}
          onChange={handleChane}
          error={errors.lastName}
        />
        <Field
          value={customer.firstName}
          onChange={handleChane}
          name="firstName"
          label="Prénom"
          placeholder="Prénom du client"
          error={errors.firstName}
        />
        <Field
          value={customer.email}
          onChange={handleChane}
          name="email"
          label="Email"
          placeholder="Adresse email du client"
          error={errors.email}
        />
        <Field
          value={customer.company}
          onChange={handleChane}
          name="company"
          label="Entreprise"
          placeholder="Entreprise du client"
          error={errors.company}
        />

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Ajouter
          </button>
          <Link to="/customers" className="btn btn-link">
            Retour sur la liste des clients
          </Link>
        </div>
      </form>
    </>
  );
};

export default CustomerPage;
