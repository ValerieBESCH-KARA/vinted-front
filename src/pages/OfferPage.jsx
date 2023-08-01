import "../styles/offerPage.css";

import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate, Link } from "react-router-dom";

import axios from "axios";

const OfferPage = ({ token }) => {
  const [offerInfos, setOfferInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );

        // console.log("data offerPage>>>",data);

        setOfferInfos(data);
        setIsLoading(false);
      } catch (error) {
        console.log("error catch OfferPage>>>", error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <main>
      <div className="container offer-page">
        <div>
          <img src={offerInfos.product_pictures[0].secure_url} alt="preview" />
        </div>

        <div className="offer-bloc">
          <p>{offerInfos.product_price} €</p>

          <div className="offer-info">
            {offerInfos.product_details.map((elem) => {
              console.log(elem);

              const keyName = Object.keys(elem)[0];
              return (
                <div>
                  {keyName} : {elem[keyName]}
                </div>
              );
            })}
          </div>

          <Link
            to="/payment"
            state={{
              title: offerInfos.product_name,
              amount: offerInfos.product_price,
              ownerID: offerInfos.owner._id,
            }}
          >
            <span>Acheter</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default OfferPage;
