import { useEffect, useState } from "react";
import axios from "axios";

import Hero from "../components/Hero";
import OfferCard from "../components/OfferCard";

import "../styles/homePage.css";

const HomePage = () => {
  const [offersList, setOffersList] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log("response data HomePage >>>", response.data);

        setOffersList(response.data.offers);
        setIsloading(false);
      } catch (error) {
        console.log("catch error HomePage >>>", error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>Laoding...</div>
  ) : (
    <main>
      <Hero />

      <div className="home-page ">
        <div className="container offers-bloc">
          {offersList.map((offer) => {
            return <OfferCard key={offer._id} offer={offer} />;
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
