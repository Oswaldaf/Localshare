import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from '../components/Input/Input'
import axios from 'axios';
import Button from '../components/Button/Button';
import  './GroupCreate.css'

function GroupCreate() {
    const [group_name, setGroup_name] = useState("")
    const [description, setDescription] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [member, setMember] = useState([])

    const [error, setError] = useState(false)

    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('user_id');

         const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false)
        if(group_name.trim().length < 4){ 
            setError(true);
            const errorMessage = "Le nom doit avoir plus de trois caractères";
            toast.error(errorMessage);
            return;
        }
        setIsLoading(true);
        const formData = new FormData();

    formData.set("group_name", group_name);
    formData.set("description", description);
    formData.set("created_by", userId);
    

    const response = await axios.post(
        "http://127.0.0.1:8000/api/v2.0.0/createGroup", formData,
         {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json' 
            },
          }
        
    );
    console.log("token:", token)
    console.log("userId:", userId)

    if(response.data.success) {
        toast.success(response.data.message),
        setIsLoading(false)
    }else {
        console.log(response.data)
        if(response.data.data.group_name !== undefined){
            setError(true)
            toast.error(response.data.data.message[0]);
        }
        setIsLoading(false)
    };
    }
    
      return (
        <div id='container'>
            <ToastContainer stacked/>
            <h1>Création d'un nouveau groupe</h1>
            
            <form action="" onSubmit={handleSubmit} >
            <Input
    label={"Nom du groupe"}
    type={"text"}
    placeholder={"Veuillez saisir le nom du groupe..."}
    value={group_name}
    reference={"group_name"}
    onChange={(e) => {
        setGroup_name(e.target.value)
    }}
    />
       <input name="description" className='input'
       label={"Description du groupe"}
       type={"text"}
       value={description || ''}
       placeholder={"Veuillez saisir la description du groupe"}
       rows={"3"}
       reference={"description"}
       onChange={(e) => {
        setDescription(e.target.value)
       }}
        id=""
        ></input> 
        <Button 
        type={"submit"}
        disabled={isLoading}
        text={isLoading ? "Chargement.." : "Soumettre"}

        />
        <Button 
        type={"reset"}
        text={"Annuler"}

        />
            </form>
            
        </div>
    
  )
}

export default GroupCreate

