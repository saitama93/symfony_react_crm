import React, { useState } from "react";
import Field from "../components/forms/Field";
import { Link } from "react-router-dom";
import UserApi from "../services/usersApi";

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  // Gestions des changement des input dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };

  //   Gestion de la soumission
  const handleSubmit = async event => {
    event.preventDefault();

    const apiErrors = {};

    if (user.password != user.passwordConfirm) {
      apiErrors.password =
        "Votre confirmation de mot de passe a échoué, try again !";
      setErrors(apiErrors);
      return;
    }

    try {
      await UserApi.register(user);
      //   TODO: Flash notif success
      setErrors({});
      history.replace("/login");

      console.log(response);
    } catch (error) {
      console.log(error.response);
      const { violations } = error.response.data;

      if (violations) {
        violations.forEach(violation => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }

      //   TODO: Flash error
    }
  };

  return (
    <>
      <h1>Inscription</h1>

      <form onSubmit={handleSubmit}>
        <Field
          name="firstName"
          label="Prénom"
          placeholder=" Votre prénom"
          error={errors.firstName}
          value={user.firstName}
          onChange={handleChange}
        />

        <Field
          name="lastName"
          label="Nom"
          placeholder=" Votre nom"
          error={errors.lastName}
          value={user.lastName}
          onChange={handleChange}
        />

        <Field
          name="email"
          label="Email"
          placeholder=" Votre email"
          type="email"
          error={errors.email}
          value={user.email}
          onChange={handleChange}
        />

        <Field
          name="password"
          label="Mot de passe"
          type="password"
          placeholder=" Votre mot de passe"
          error={errors.password}
          value={user.password}
          onChange={handleChange}
        />

        <Field
          name="passwordConfirm"
          label="Confirmation du mot de passe"
          type="password"
          placeholder=" Confirmer votre mot de passe"
          error={errors.passwordConfirm}
          value={user.passwordConfirm}
          onChange={handleChange}
        />

        <div className="firm-group">
          <button type="submit" className="btn btn-success">
            Je m'inscris
          </button>
          <Link to="/login" className="btn btn-link">
            J'ai déjà un compte
          </Link>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
