import axios from "axios";

function register(user) {
  return axios.post("http://localhost:8080/api/users", user);
}

export default {
  register
};
