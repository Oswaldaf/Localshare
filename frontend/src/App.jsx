import React, { useState } from "react";
import "./App.jsx";
import "./App.css";
import Input from "./components/Input/Input.jsx";
import Button from "./components/Button/Button.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import SignImage from "./assets/SignImage.png";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.set("email", email);
    formData.set("password", password);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/v2.0.0/login",
      formData
    );
    console.log("Email récupéré après connexion :", response.data.email);
    console.log("Token récupéré après connexion :", response.data.token);
    console.log("userId:", response.data.user_id);
    const token = response.data.token;

    localStorage.setItem("email", response.data.email);
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("member_id", response.data.user_id);

    if (response.data.success) {
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(function () {
        navigate("/dashboard");
      }, 3000);
    } else {
      console.log(response.data);
      toast.error("email ou mot de passe incorrect");
      setIsLoading(false);
    }
  };

  return (
    <div className="container-app">
      <div className="sign-up">
        <ToastContainer />
        <h1>Sign-up</h1>
        <img src={SignImage} alt="" />
        <form onSubmit={handleSubmit}>
          <p>Renseignez vos information de connexion pour vous connectez</p>
          <Input
            label={"Email"}
            reference={"email"}
            type={"email"}
            value={email}
            placeholder={"Saisir l'adresse e-mail ici"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Input
            label={"Mot de passe"}
            reference={"password"}
            type={"password"}
            value={password}
            placeholder={"Saisir le mod de passe ici"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          {/* <div className="sign-buton"> */}
            <Button
              disabled={isLoading}
              type={"submit"}
              text={isLoading ? "Chargement ..." : "Soumettre"}
            />
            <Button type={"reset"} text={"Annuler"} />
          {/* </div> */}
          {/* <div className="signin-link"> */}
            <Link to={"/registration"} className="link">Inscription</Link>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}
