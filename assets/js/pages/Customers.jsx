import React from "react";

const CustomersPage = props => {
  return (
    <>
      <h1>Liste des clients</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id.</th>
            <th>Client</th>
            <th>Email</th>
            <th>Entreprise</th>
            <th className="text-center">Factures</th>
            <th className="text-center">Montant total</th>
            <th />
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>17</td>
            <td>
              <a href="#">ILMI AMIR</a>
            </td>
            <td>igal@react.com</td>
            <td>Igal SARL</td>
            <td className="text-center">
              <span className="badge badge-primary">4</span>
            </td>
            <td className="text-center">2 700,00 $</td>
            <td>
              <button className="btn btn-sm btn-danger">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default CustomersPage;
