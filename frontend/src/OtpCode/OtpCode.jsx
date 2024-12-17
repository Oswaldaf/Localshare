import React, { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function OtpCode() {
  const [OtpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.set("code", OtpCode);
    formData.set("email", params.email);

    const response = await axios.post(
      "http://127.0.0.1:8000/api/v2.0.0/otp-code",
      formData
    );

    if (response.data.success) {
      navigate("/dashboard");
      setIsLoading(false)
    } else {
      toast.error(response.data.message);
      setIsLoading(false)
    }
  };
  return (
    <div>
      <ToastContainer />
      <p>
        Un code vous a été envoyé dans votre boîte mail(
        {localStorage.getItem("email")}). Vérifiez-le et veuillez le saisir
      </p>
      <form action="" onSubmit={handleSubmit}>
        <Input
          type={"text"}
          label={"OTP Code"}
          value={OtpCode}
          reference={"otp"}
          placeholder={"Saisir le code ici"}
          onChange={(e) => {
            setOtpCode(e.target.value);
          }}
        />
        <Button
          disabled={isLoading}
          text={isLoading ? "Chargement ..." : "Soumettre"}
          type={"submit"}
        />
      </form>
    </div>
  );
}
