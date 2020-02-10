import axios from "axios";

function findAll() {
  return axios
    .get("http://localhost:8080/api/customers")
    .then(response => response.data["hydra:member"]);
}

function deleteCustomer(id) {
  return axios.delete("http://localhost:8080/api/customers/" + id);
}

export default {
  findAll,
  delete: deleteCustomer
};
