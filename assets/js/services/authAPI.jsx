import axios from "axios";

function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
  return (
    axios
      // Appel de la requete en POST avec les credentials
      .post("http://localhost:8080/api/login_check", credentials)
      .then(response => response.data.token)
      .then(token => {
        // Stockage du token dans le localStorage
        window.localStorage.setItem("authToken", token);
        // On prévient axios qu'on a maintenant un hader par default sur toutes nos futurs requêtes HTTP
        axios.defaults.headers["Authorization"] = "Bearer " + token;
      })
  );
}

export default {
  authenticate,
  logout
};
