import "../styles/hero.css";
import banner from "../assets/hero.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <hero>
      <div className="banner ">
        <img src={banner} alt="banner" />
        <div>
          <img
            src="https://static.vinted.com/assets/hero-block/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg"
            alt="effet"
            className="effet"
          />
        </div>

        <div className="container">
          <div className="card-bloc">
            <div className=" hero-bloc">
              <p>Prêts à faire du tri dans vos placards ?</p>
              <Link to="/publish">Vends maintenant</Link>
            </div>
          </div>
        </div>
      </div>
    </hero>
  );
};

export default Hero;
