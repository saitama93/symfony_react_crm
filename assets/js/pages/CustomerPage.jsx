import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import CustomersAPI from "../services/customersAPI";
import { toast } from "react-toastify";

const CustomerPage = ({ match, history }) => {
  const { id = "new" } = match.params;

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

  // Gestions des changement des input dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  const [editing, setEditing] = useState(false);

  // Récupération du customer en fonction de l'dentifiant
  const fecthCustomer = async id => {
    try {
      const { firstName, lastName, email, company } = await CustomersAPI.find(
        id
      );
      setCustomer({ firstName, lastName, email, company });
    } catch (error) {
      // Notification flash d'une erreur
      toast.error("Le client n'a pas pu être chargé");
      history.replace("/customers");
    }
  };

  // Chargement du custormer si besoin au chargement du composant ou au changement de l'identifiant
  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fecthCustomer(id);
    }
  }, [id]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      setErrors({});
      if (editing) {
        await CustomersAPI.update(id, customer);
        // Flash notification de success
        toast.success("Le client a bien été modifié");
      } else {
        await CustomersAPI.create(customer);
        // Flash notification de success
        toast.success("Le client a bien été créé");
        history.replace("/customers");
      }
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
        // Flash notification des erreurs
        toast.error("Des erreurs dans votre formulaire");
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
          onChange={handleChange}
          error={errors.lastName}
        />
        <Field
          value={customer.firstName}
          onChange={handleChange}
          name="firstName"
          label="Prénom"
          placeholder="Prénom du client"
          error={errors.firstName}
        />
        <Field
          value={customer.email}
          onChange={handleChange}
          name="email"
          label="Email"
          placeholder="Adresse email du client"
          error={errors.email}
        />
        <Field
          value={customer.company}
          onChange={handleChange}
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
