import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './ProfilCard.css';
import { RxAvatar } from "react-icons/rx";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('email');
    const fetchUserData = async () => {
        
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/v2.0.0/getUserByEmail',
            { email });

        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!user) {
    return <p>Aucun utilisateur connecté</p>;
  }

  return (
    <div className="profile-card">
<div >
  {user.avatar ? (
    
    <img src={`http://localhost:8000/storage/${user.avatar}`} alt="Profile Avatar" className="profile-image"/>
  ) : (
    <RxAvatar size={50} />  
  )}
</div>      <h3 className="user-name">{user.name}</h3>
      <p className="user-email">{user.email}</p>
    </div>
  );
};

export default ProfileCard;
