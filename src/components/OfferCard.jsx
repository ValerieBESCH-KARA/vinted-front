import { Link } from "react-router-dom";

const OfferCard = ({ offer }) => {
  return (
    <Link to={`/offer/${offer._id}`} key={offer._id}>
      <div className="offer-card">
        <div>
          {offer.owner.account.avatar && (
            <img
              src={offer.owner.account.avatar.secure_url}
              alt="avatar"
              className="avatar"
            />
          )}

          <p>{offer.owner.account.username}</p>
        </div>

        <img src={offer.product_image.secure_url} alt="" />

        <div className="offerCard-price">
          <p>{offer.product_price} €</p>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
