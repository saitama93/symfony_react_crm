import axios from "axios";
import jwtDecode from "jwt-decode";

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
        setAxiosToken(token);
      })
  );
}

function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
  // 1. Voir si on a un token
  const token = window.localStorage.getItem("authToken");
  // 2. Vérifier si le token est toujours valid
  if (token) {
    const { exp: expiration } = jwtDecode(token);
    if (expiration * 1000 > new Date().getTime()) {
      // 3. Donner le token à axios
      setAxiosToken(token);
    }
  }
}

export default {
  authenticate,
  logout,
  setup
};
