import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import './GroupList.css'
import logoGroup from '../assets/logoGroup.png' 
import NavBar from '../components/NavBar/NavBar'


function GroupList() {
    const [groups, setGroups] = useState([])
    const [selectedForum, setSelectedForum] =useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const token = localStorage.getItem('token')
    const navigate = useNavigate();
    useEffect(() => {
      const errorMessage = "Erreur lors de la récupération des données."
      
      setIsLoading(true)
      
      const fetchGroups = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/v2.0.0/groupList', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json' 
            },
          } );
          setGroups(response.data.groups)
          localStorage.setItem('group_id', response.data.groups[0]?.id || null)
          console.log("token:", token)
          console.log("groupes:", response.data.groups)
          
          setIsLoading(false)
          setError(false)
        }catch(error){
          setError(true)
          toast.error(errorMessage)
        }
        
      };
      
    
      fetchGroups();
    },[])
    const handleViewGroup = (groupId) => {
      localStorage.setItem('group_id', groupId); 
      navigate(`/group/${groupId}`); 
    };
    if (isLoading) {
      return <p>Chargement des groupes...</p>;
    }
  return (
  <>
  <ToastContainer />
  <NavBar />
  {/* <header className="header">
    <h1>Your Groups</h1>
  </header> */}

  <table className="datatable">
    <thead>
      <tr>
        <th>Logo</th>
        <th>Nom du Groupe</th>
        <th>Date de Création</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {groups.map((group) => (
        <tr key={group.id} className="group-row">
          <td><img src={logoGroup} alt="Group Logo" className="group-logo" /></td>
          <td>{group.group_name}</td>
          <td>{new Date(group.created_at).toLocaleDateString()}</td>
          <td><button className="view-btn" onClick={() => handleViewGroup(group.id)

          
            
          }>Voir le groupe</button></td>
        </tr>
      ))}
    </tbody>
  </table>
</>
  )
}

export default GroupList