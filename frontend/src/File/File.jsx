import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import NavBar from '../components/NavBar/NavBar'

function File() {
    const [files, setFiles] = useState([])
    const [groups, setGroups] = useState([])
    const [error, setError] = useState(false)
    const token = localStorage.getItem("token")
    
    useEffect(() => {
        const errorMessage = "Erreur lors de la récupération des données"

        const fetchFiles = async ()=> {
            try {
                const response = await axios.get(
                    'http://127.0.0.1:8000/api/v2.0.0/files', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );
                setError(false)
                setFiles(response.data.files)
                setGroups(response.data.groups)
            }catch(error) {
                setError(true)
                toast.error(errorMessage)
            }
        }
        fetchFiles()
    },[])
  return (
    <>
  <ToastContainer />
  <NavBar/>
  <header className="header">
    <h1>Your Groups</h1>
  </header>

  <table className="datatable">
    <thead>
      <tr>
        <th>File Name</th>
        <th>Send at</th>
        <th>Send In</th>
      </tr>
    </thead>
    <tbody>
      {groups.map((group) => (
        <tr key={group.id} className="group-row">
                    <td>{files.map((file) => (<span key={file.group_id}><a href="">{file.file}</a><br /></span>))}</td>
          <td>{files.map((file) => (<span key={file.id}>{new Date(file.created_at).toLocaleDateString()}<br></br></span>))}</td>
          <td>{group.group_name}</td>
          {/* <td>{groups.map((group) => (<span  key={group.id}>{group.group_name}</span>))}</td> */}
          
        </tr>
        ))}
    </tbody>
  </table>
</>
  )
}

export default File