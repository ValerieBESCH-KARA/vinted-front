import { Link } from "react-router-dom";
import Logo from "../assets/logo-vinted.png";
import Cookies from "js-cookie";

import "../styles/header.css";

const Header = ({ token, setToken }) => {
  // console.log("token header>>>", token);
  return (
    <header className="container">
      <Link to="/">
        <img src={Logo} alt="logo" />
      </Link>

      <div className="input-search">
        <input type="search" placeholder="Rechercher des articles" />
      </div>

      <div>
        {token ? (
          <button
            className="button-deconnexion"
            onClick={() => {
              setToken("");
              Cookies.remove("token");
            }}
          >
            Se deconnecter
          </button>
        ) : (
          <>
            <Link to="/signup" className="button-bloc button ">
              S'inscrire
            </Link>
            <Link to="/login" className="button-bloc button">
              Se connecter
            </Link>
          </>
        )}

        <Link to="/publish" className=" button-bloc button-reverse">
          Vends tes articles
        </Link>
      </div>
    </header>
  );
};

export default Header;
