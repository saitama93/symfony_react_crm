import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import { Link } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import axios from "axios";

const InvoicePage = ({ history, match }) => {
  const { id = "new" } = match.params;

  const [invoice, setInvoice] = useState({
    amount: "",
    customer: "",
    status: "SENT"
  });

  const [errors, setErrors] = useState({
    amount: "",
    customer: "",
    status: ""
  });

  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(false);

  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);

      if (!invoice.customer && !id)
        setInvoice({ ...invoice, customer: data[0].id });
    } catch (error) {
      console.log(error.response);
    }
  };

  const fetchInvoice = async id => {
    try {
      const data = await axios
        .get("http://localhost:8080/api/invoices/" + id)
        .then(response => response.data);

      const { amount, status, customer } = data;

      setInvoice({ amount, status, customer: customer.id });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchInvoice(id);
    }
  }, [id]);

  // Gestions des changement des input dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (editing) {
        const response = await axios.put(
          "http://localhost:8080/api/invoices/" + id,
          {
            ...invoice,
            customer: `/api/customers/${invoice.customer}`
          }
        );
        //   TODO: Flash notifi success
        console.log(response);
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/invoices",
          {
            ...invoice,
            customer: `/api/customers/${invoice.customer}`
          }
        );
        //   TOFO: Flash notification success
        history.replace("/invoices");
      }
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });

        setErrors(apiErrors);

        // TODO: Flash notification des erreurs
      }
    }
  };

  return (
    <>
      {(editing && <h1>Modification d'une facture</h1>) || (
        <h1>Création d'une facture</h1>
      )}

      <form onSubmit={handleSubmit}>
        <Field
          name="amount"
          type="number"
          placeholder="Montant de la facture"
          label="Montant"
          value={invoice.amount}
          error={errors.amount}
          onChange={handleChange}
        />

        <Select
          name="customer"
          label="Client"
          value={invoice.customer}
          error={errors.customer}
          onChange={handleChange}
        >
          {customers.map(customer => (
            <option key={customer.id} value={customer.id}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </Select>

        <Select
          name="status"
          label="Status"
          value={invoice.status}
          error={errors.status}
          onChange={handleChange}
        >
          <option value="SENT">Envoyée</option>
          <option value="PAID">Payée</option>
          <option value="CANCELLED">Annulée</option>
        </Select>

        <div className="form-group">
          {(editing && (
            <button type="submit" className="btn btn-success">
              Enregistrer les modifications
            </button>
          )) || (
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
          )}
          <Link to="/invoices" className="btn btn-link">
            Retour aux factures
          </Link>
        </div>
      </form>
    </>
  );
};

export default InvoicePage;
