import "../styles/hero.css";
import banner from "../assets/hero.jpg";

const Hero = () => {
  return (
    <hero>
      <div>
        <img src={banner} alt="banner" className="banner" />
        <img
          src="https://static.vinted.com/assets/hero-block/tear-d431548c90905ad757632e4c3075d9473e38c7c6642721efeae9413afb9387a2.svg"
          alt="effet"
          className="effet"
        />
        <div className=" hero-bloc container">
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button>Vends maintenant</button>
        </div>
      </div>
    </hero>
  );
};

export default Hero;
