import React, { useEffect, useState } from "react";
import axios from "axios";

const CustomersPage = props => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  console.log(currentPage);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers")
      .then(response => response.data["hydra:member"])
      .then(data => setCustomers(data))
      .catch(error => console.log(error.response));
  }, []);

  const handleDelete = id => {
    // On copie le  tableau des customers
    const originalCustomers = [...customers];

    // On filtre le tableau affiché pour cela on enlève le customer avec l'id donné
    setCustomers(customers.filter(customer => customer.id !== id));
    axios
      .delete("http://localhost:8080/api/customers/" + id)
      .then(response => console.log("ok"))
      .catch(error => {
        setCustomers(originalCustomers);
        console.log(error.response);
      });
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const itemsPerPage = 8;
  const pagesCount = Math.ceil(customers.length / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  // D'pù on part (start) pendant combien (itemsPerPage)
  const start = currentPage * itemsPerPage - itemsPerPage;

  const paginatedCustomers = customers.slice(start, start + itemsPerPage);

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
          {paginatedCustomers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <a href="#">{customer.fisrtName}</a>
              </td>
              <td>{customer.email}</td>
              <td>{customer.company}</td>
              <td className="text-center">
                <span className="badge badge-primary">
                  {customer.invoices.length}
                </span>
              </td>
              <td className="text-center">
                {customer.totalAmount.toLocaleString()} €
              </td>
              <td>
                <button
                  onClick={() => handleDelete(customer.id)}
                  disabled={customer.invoices.length > 0}
                  className="btn btn-sm btn-danger"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <ul className="pagination pagination-sm d-flex justify-content-center ">
          <li className={"page-item " + (currentPage === 1 && "disabled")}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &laquo;
            </button>
          </li>
          {pages.map(page => (
            <li
              key={page}
              className={"page-item " + (currentPage === page && "active")}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}

          <li
            className={
              "page-item " + (currentPage === pagesCount && "disabled")
            }
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default CustomersPage;
