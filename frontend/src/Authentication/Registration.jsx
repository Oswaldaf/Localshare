import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import './Registration.css'

export default function Registration() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    if (email.trim().length < 6 || email.trim().length > 32) {
      setError(true);
      const errorMessage = "L'email doit être compris entre 6 et 32 caractères";
      toast.error(errorMessage);
      return;
    }

    if (password.trim().length < 6 || password.trim().length > 32) {
      setError(true);
      const errorMessage =
        "Le mot de passe doit être compris entre 6 et 32 caractères";
      toast.error(errorMessage);
      return;
    }

    if (passwordConfirm.trim() != password.trim()) {
      setError(true);
      const errorMessage = "Les deux mot de passe sont différents";
      toast.error(errorMessage);
      return;
    }
    if (error) {
      setError(true);
      toast.error(response.data.message);
    }

    localStorage.setItem("email", email);

    setIsLoading(true);
    const formData = new FormData();

    formData.set("name", name);
    formData.set("email", email);
    formData.set("avatar", selectedFile);
    formData.set("password", password);
    formData.set("password_confirm", passwordConfirm);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/v2.0.0/register",
      formData
    );

    if (response.data.success) {
      toast.success(response.data.message);
      setIsLoading(false);
      setTimeout(function () {
        navigate("/otp-code/" + email);
      }, 3000);
    } else {
      console.log(response.data);

      if (response.data.data.name !== undefined) {
        toast.error(response.data.data.name[0]);
      } else if (response.data.data.email !== undefined) {
        toast.error(response.data.data.email[0]);
      } else if (response.data.data.avatar !== undefined) {
        toast.error(response.data.data.avatar[0]);
      } else if (response.data.data.password !== undefined) {
        toast.error(response.data.data.password[0]);
      } else if (response.data.data.passwordConfirm !== undefined) {
        toast.error(response.data.data.passwordConfirm[0]);
      }

      setIsLoading(false);
    }
  };
  return (
    <div className="container-signup">
      <div className="sign-in">
        <ToastContainer stacked />

        <h1>Inscription</h1>
        <form action="" onSubmit={handleSubmit}>
          <p>Renseignez vos information Inscription pour vous inscrire</p>
          <Input
            label={"name"}
            reference={"name"}
            type={"text"}
            value={name}
            placeholder={"Saisir le nom ici"}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            label={"email"}
            reference={"email"}
            type={"text"}
            value={email}
            placeholder={"Saisir l'adresse e-mail ici"}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            label={"email"}
            reference={"email"}
            type={"file"}
            placeholder={""}
            onChange={(e) => {
              handleFileChange;
            }}
          />

          

          <Input
            label={"Mot de passe"}
            reference={"password"}
            type={"password"}
            value={password}
            placeholder={"Saisir le mot de passe ici"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Input
            label={"Confirmation"}
            reference={"passwordConfirm"}
            type={"password"}
            value={passwordConfirm}
            placeholder={"Saisir le mot de passe ici"}
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          />

          {/* <div className="sign-buton"> */}
            <Button
              disabled={isLoading}
              type={"submit"}
              text={isLoading ? "Chargement ..." : "Soumettre"}
            />
            <Button type={"reset"} text={"Anuler"} />
          {/* </div> */}
          {/* <div className="signin-link"> */}
            <Link to={"/"} className="link">Connexion</Link>
          {/* </div> */}
        </form>
      </div>
    </div>
  );
}
