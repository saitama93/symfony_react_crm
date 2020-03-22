import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import CustomersAPI from "../services/customersAPI";
import invoicesAPI from "../services/invoicesAPI";

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

  //   Récupération des clients
  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);

      if (!invoice.customer && !id)
        setInvoice({ ...invoice, customer: data[0].id });
    } catch (error) {
      console.log(error.response);
      //   TODO: Flash notif erreur
      history.replace("/invoices");
    }
  };

  //   Récupération d'une facture
  const fetchInvoice = async id => {
    try {
      const { amount, status, customer } = await invoicesAPI.find(id);

      setInvoice({ amount, status, customer: customer.id });
    } catch (error) {
      console.log(error.response);
      //   TODO: Flash notif erreur
      history.replace("/invoices");
    }
  };

  //   Récupération de la liste des clients à chaque chargement du composant
  useEffect(() => {
    fetchCustomers();
  }, []);

  //   Récupération de la bonne facture quand l'id de l'url change
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

  //   Gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      if (editing) {
        await invoicesAPI.update(id, invoice);
        //   TODO: Flash notifi success
      } else {
        await invoicesAPI.create(invoice);
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
