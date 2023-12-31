import "./styles/App.css";

import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
library.add(faPlus);

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import OfferPage from "./pages/OfferPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PublishPage from "./pages/PublishPage";
import PaymentPage from "./pages/PaymentPage";
import Footer from "./components/Footer";

function App() {
  const [token, setToken] = useState(Cookies.get("token") || "");

  return (
    <Router>
      <Header setToken={setToken} token={token} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/offer/:id" element={<OfferPage setToken={setToken} />} />
        <Route path="/signup" element={<SignupPage setToken={setToken} />} />
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/publish" element={<PublishPage token={token} />} />
        <Route
          path="/payment"
          element={<PaymentPage token={token} setToken={setToken} />}
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
