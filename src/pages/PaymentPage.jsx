import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Navigate, useLocation } from "react-router-dom";

import "../styles/checkoutForm.css";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP"
);

const PaymentPage = ({ token }) => {
  // console.log("payment token>>>", token);

  const location = useLocation();
  console.log("payment location>>>", location.state);

  return !token ? (
    <Navigate to="/login" state={{ from: "/payment" }} />
  ) : (
    <div className="payment-page">
      <div className="payment-bloc">
        <Elements stripe={stripePromise}>
          <CheckoutForm infoPayment={location.state} />
        </Elements>
      </div>
    </div>
  );
};

export default PaymentPage;
