import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

import "../styles/checkoutForm.css";

const CheckoutForm = ({ infoPayment }) => {
  const { amount, title } = infoPayment;

  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement, {
      name: infoPayment.owner_id,
    });
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;

    const response = await axios.post(
      " https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        token: stripeToken,
        title,
        amount,
      }
    );
    console.log(response.data);
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <div>
      {!completed ? (
        <div>
          <div className="checkoutForm-bloc">
            <h3>Résumé de la commande</h3>

            <div className="resume">
              <div>
                Commande <span>{amount}</span>
              </div>
              <div>
                Frais protection acheteurs <span>0.40€</span>
              </div>
              <div>
                Frais de port <span>0.80€</span>
              </div>
            </div>

            <div>
              total <span>{amount + 1.2}</span>{" "}
            </div>
            <p>{`Il ne vous reste plus qu'un étape pour vous offrir
              ${title}. Vous allez payer ${amount} € (frais de protection et frais de port inclus).`}</p>

            <form onSubmit={handleSubmit}>
              <CardElement />
              <button type="submit" className="button-pay">
                Pay
              </button>
            </form>
          </div>
        </div>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </div>
  );
};

export default CheckoutForm;
