import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/publishPage.css";

const PublishPage = ({ token }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [exchange, setExchange] = useState(false);

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  // console.log("token publishPage =>", token);

  const navigate = useNavigate();
  return !token ? (
    <Navigate to="/login" state={{ from: "/publish" }} />
  ) : (
    <div className="main-publish">
      <div className="container">
        <h2>Vends ton article</h2>

        <form
          onSubmit={async (event) => {
            event.preventDefault();

            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("price", Number(price));
            formData.append("condition", condition);
            formData.append("city", city);
            formData.append("brand", brand);
            formData.append("size", size);
            formData.append("color", color);
            formData.append("picture", selectedFile);

            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
                formData,
                {
                  headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "multipart/form-data",
                  },
                }
              );

              console.log(response.data);

              navigate("/");
            } catch (error) {
              console.log(error.response);
            }
          }}
        >
          <div className="picture-publish-bloc ">
            <div className="picture-publish">
              {preview ? (
                <div className="publish-preview-bloc">
                  <img
                    src={preview}
                    alt="previsualisation"
                    className="publish-preview"
                  />
                  <div
                    className="remove-img"
                    onClick={() => {
                      setPreview("");
                    }}
                  >
                    X
                  </div>
                </div>
              ) : (
                <div>
                  <input
                    type="file"
                    id="selectedFile"
                    onChange={(event) => {
                      setSelectedFile(event.target.files[0]);
                      const objectUrl = URL.createObjectURL(
                        event.target.files[0]
                      );
                      setPreview(objectUrl);
                    }}
                  />
                  <label htmlFor="selectedFile">
                    <FontAwesomeIcon
                      className="publish-icon"
                      icon="fa-solid fa-plus"
                    />
                    <span>Ajoute une photo</span>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="publish-bloc">
            <div className="input-bloc">
              <label htmlFor="title">Titre</label>
              <div>
                <input
                  type="text"
                  id="title"
                  onChange={(event) => {
                    handleChange(event, setTitle);
                  }}
                  value={title}
                  placeholder="ex : Chemise Sézane verte"
                />
              </div>
            </div>

            <div className="input-bloc description">
              <label htmlFor="desc">Décris ton article</label>
              <div>
                <textarea
                  type="text"
                  id="desc"
                  onChange={(event) => {
                    handleChange(event, setDescription);
                  }}
                  value={description}
                  placeholder="ex : porté quelques fois, taille correctement"
                />
              </div>
            </div>
          </div>

          <div className="publish-bloc">
            <div className="input-bloc">
              <label htmlFor="brand">Marque</label>
              <div>
                <input
                  type="text"
                  id="brand"
                  onChange={(event) => {
                    handleChange(event, setBrand);
                  }}
                  value={brand}
                  placeholder="ex : Zara"
                />
              </div>
            </div>

            <div className="input-bloc">
              <label htmlFor="size">Taille</label>
              <div>
                <input
                  type="text"
                  id="size"
                  onChange={(event) => {
                    handleChange(event, setSize);
                  }}
                  value={size}
                  placeholder="ex : L/ 40/ 12"
                />
              </div>
            </div>

            <div className="input-bloc">
              <label htmlFor="color">Couleur</label>
              <div>
                <input
                  type="text"
                  id="color"
                  onChange={(event) => {
                    handleChange(event, setColor);
                  }}
                  value={color}
                  placeholder="ex : Fushia"
                />
              </div>
            </div>

            <div className="input-bloc">
              <label htmlFor="condition">État</label>
              <div>
                <input
                  type="text"
                  id="condition"
                  onChange={(event) => {
                    handleChange(event, setCondition);
                  }}
                  value={condition}
                  placeholder="Neuf avec étiquette"
                />
              </div>
            </div>

            <div className="input-bloc">
              <label htmlFor="city">Lieu</label>
              <div>
                <input
                  type="text"
                  id="city"
                  onChange={(event) => {
                    handleChange(event, setCity);
                  }}
                  value={city}
                  placeholder="ex : Paris"
                />
              </div>
            </div>
          </div>

          <div className="publish-bloc">
            <div className="input-bloc">
              <label htmlFor="price">Prix</label>
              <div className="price-bloc">
                <div>
                  <input
                    type="text"
                    id="price"
                    onChange={(event) => {
                      handleChange(event, setPrice);
                    }}
                    value={price}
                    placeholder="0.00 €"
                  />

                  {/* <label htmlFor="exchange">
                    Je suis intéressé(e) par les échanges
                  </label>
                  <input
                    type="checkbox"
                    name="exchange"
                    id="exchange"
                    checked={exchange}
                    onChange={(event) => {
                      setNewsletter(!setExchange);
                    }}
                  /> */}
                </div>
              </div>
            </div>
          </div>

          <div className="form-button">
            <button>Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishPage;
