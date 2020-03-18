import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import axios from "axios";

const CustomerPage = props => {
  const { id = "new" } = props.match.params;

  const [customer, setCustomer] = useState({
    lastName: "",
    firstName: "",
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

  const [editing, setEditing] = useState(false);

  const fecthCustomer = async id => {
    try {
      const data = await axios
        .get("http://localhost:8080/api/customers/" + id)
        .then(response => response.data);
      const { firstName, lastName, email, company } = data;

      setCustomer({ firstName, lastName, email, company });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fecthCustomer(id);
    }
  }, [id]);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (editing) {
        const response = await axios.put(
          "http://localhost:8080/api/customers/" + id,
          customer
        );
        // TODO: Flash notification de success
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/customers",
          customer
        );
        // TODO: Flash notification de success
        props.history.replace("/customers");
      }
      setErrors({});
    } catch (error) {
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.forEach(violation => {
          apiErrors[violation.propertyPath] = violation.message;
        });

        setErrors(apiErrors);

        // TODO: Flash notification des erreurs
      }
    }
  };

  return (
    <>
      {(!editing && <h1>Création d'un client</h1>) || (
        <h1>Modification d'un client</h1>
      )}

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
