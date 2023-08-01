import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import axios from "axios";
import Cookies from "js-cookie";

const LoginPage = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  console.log("location login =>", location.state?.from);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs !");
    } else {
      try {
        const { data } = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          {
            email,
            password,
          }
        );

        // console.log(data.token);
        Cookies.set("token", data.token);
        setToken(data.token);
        // console.log("token loginPage>>>", data.token);
        if (location.state) {
          navigate(location.state.from);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log("error catch LoginPage>>", error);
      }
    }
  };

  return (
    <main>
      <div className="container form-bloc">
        <h1>Se connecter</h1>

        <form onSubmit={handleSubmit}>
          <input
            className="form-bloc"
            type="email"
            name="email"
            id="email"
            placeholder="Adress email"
            value={email}
            onChange={(event) => {
              setErrorMessage("");
              setEmail(event.target.value);
            }}
          />

          <input
            className="form-bloc"
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setErrorMessage("");
              setPassword(event.target.value);
            }}
          />

          <button>Se connecter</button>

          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
