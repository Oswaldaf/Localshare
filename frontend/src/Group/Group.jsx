import React, { useEffect, useState } from "react";
import axios from "axios";
import logoGroup from "../assets/logoGroup.png";
import "../Group/Group.css";
import Dashboard from "../Dashboard/Dashboard";
import { IoMdPersonAdd } from "react-icons/io";
import { RiSendPlaneFill } from "react-icons/ri";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";

function Group() {
  const [group, setGroup] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [files, setFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [newMember, setNewMember] = useState(false);
  const showNewMember = () => setNewMember(!newMember);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const groupId = localStorage.getItem("group_id");
  const memberId = localStorage.getItem("member_id");

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v2.0.0/group/${groupId}/getGroupById`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.setItem("member_id", response.data.members[0]?.id);
      setGroup(response.data.group);
      setUsers(response.data.users);
      console.log(response);

      console.log("groupid", groupId);
      console.log("token:", token);
    };
    fetchGroups();
    const fetchData = async () => {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v2.0.0/group/${groupId}/groupFiles`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setFiles(...files, response.data.files);
      console.log(response.data.files);
    };
    fetchData();
  }, [groupId]);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadStatus("Veuillez sélectionner un fichier à envoyer.");
      return;
    }
    const member_id = localStorage.getItem("id");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.set("member_id", member_id);
    formData.set("group_id", groupId);
    console.log("memberid:", member_id);

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/v2.0.0/group/${groupId}/addFile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(files);
      setUploadStatus("Fichier envoyé avec succès !");
    } catch (error) {
      setUploadStatus("Erreur lors de l'envoi du fichier.");
      console.error("Erreur:", error);
    }
  };
  const addMember = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    formData.set("email", email);

    const response = await axios.post(
      `http://127.0.0.1:8000/api/v2.0.0/groups/${groupId}/addMember`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (!response.data.success) {
      setIsLoading(false);
      toast.error(response.data.message);
    } else {
      setIsLoading(false);
      toast.success(response.data.message);
    }
  };

  return (
    <>
      <Dashboard />
      <div className="big-container">
        <div className="container">
          <ToastContainer />
          <div>
            {group ? (
              <div className="file-upload">
                <div className="group-head">
                  <img
                    src={logoGroup}
                    alt="Group Logo"
                    className="group-logo"
                  />
                  <div>
                    <h3 className="group-title">{group.group_name}</h3>
                    <h4 className="group-description">{group.description}</h4>
                  </div>
                </div>
                <div className="new-member">
                  <div>
                    <IoMdPersonAdd
                      className="add-member"
                      onClick={showNewMember}
                    />
                  </div>
                  {newMember && (
                    <div>
                      <form onSubmit={addMember}>
                        <input
                          className="input-b"
                          type="email"
                          value={email}
                          placeholder="Saisir l'adresse e-mail ici"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="buton-b"
                        >
                          {isLoading ? "Chargement ..." : "Ajouter"}
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p>Chargement du groupe</p>
            )}
            <div className="group-files">
              {files && files.length == 0 ? (
                <p>Aucun fichier envoyé pour le moment.</p>
              ) : (
                files.map((file) => (
                  <div
                    key={file.id}
                    className={`file-item ${
                      file.member_id === memberId ? "left" : "right"
                    }`}
                  >
                    <span className="file-sender">
                      {file.member_id === memberId ? "Vous" : file.sender_name}
                    </span>
                    <div className="file-content">
                      <a
                        href={`http://127.0.0.1:8000/files/${file.file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {file.file}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
            <form onSubmit={handleSubmit}>
              <div className="sending">
                <input
                  type="file"
                  className="file-input"
                  onChange={handleFileChange}
                  placeholder="Veuillez choisir un fichier"
                />
                <button type="submit">
                  <RiSendPlaneFill className="submit-btn" />
                </button>
              </div>
            </form>
            {uploadStatus && <p>{uploadStatus}</p>}
          </div>
        </div>
        <div className="group-members">
          <div  className="members-header">
          <img src={logoGroup} alt="Group Logo" className="group-logo" />
          <h3>Les membres du groupe</h3>
          </div>
          <div>
            {users && users.length == 0 ? (
              <p>Aucun membre dans ce groupe pour le moment</p>
            ) : (
              users.map((user) => (
                <div key={user.id} className="members-list">
                  <div className="member">
                    <h3>{user.email}</h3>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Group;
