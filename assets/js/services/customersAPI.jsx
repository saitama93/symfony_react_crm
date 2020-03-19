import axios from "axios";

function findAll() {
  return axios
    .get("http://localhost:8080/api/customers")
    .then(response => response.data["hydra:member"]);
}

function deleteCustomer(id) {
  return axios.delete("http://localhost:8080/api/customers/" + id);
}

function find(id) {
  return axios
    .get("http://localhost:8080/api/customers/" + id)
    .then(response => response.data);
}

function update(id, customer) {
  return axios.put("http://localhost:8080/api/customers/" + id, customer);
}

function create(customer) {
  return axios.post("http://localhost:8080/api/customers", customer);
}

export default {
  findAll,
  delete: deleteCustomer,
  find,
  update,
  create
};
