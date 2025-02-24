import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api";
import AuthService from "../services/auth.service";
import "../css/Profile.css";
import axios from 'axios';  // Importation directe de axios

const Profile = ({ updateUser }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ lastname: "", firstname: "", email: "", photo: null });
    const [newUserData, setNewUserData] = useState({ 
        lastname: "", 
        firstname: "", 
        email: "", 
        password: "", 
        password_confirmation: "",
        photo: null
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [error, setError] = useState('');
    const [isPhotoChanged, setIsPhotoChanged] = useState(false);
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/user");
                setUser(response.data);
                setNewUserData({ 
                    lastname: response.data.lastname, 
                    firstname: response.data.firstname, 
                    email: response.data.email, 
                    password: "", 
                    password_confirmation: "" 
                });
                
                if (response.data.photo) {
                    console.log("Photo path:", response.data.photo);
                    setPhotoPreview(`http://127.0.0.1:8000/storage/${response.data.photo}`);
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du profil", error);
                setError("Impossible de charger les données du profil");
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setNewUserData({
                ...newUserData,
                photo: e.target.files[0]
            });
            
            if (e.target.files[0]) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    setPhotoPreview(e.target.result);
                    setIsPhotoChanged(true);
                };
                fileReader.readAsDataURL(e.target.files[0]);
            }
        } else {
            setNewUserData({ 
                ...newUserData, 
                [e.target.name]: e.target.value 
            });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('lastname', newUserData.lastname);
            formData.append('firstname', newUserData.firstname);
            formData.append('email', newUserData.email);
            
            if (newUserData.password) {
                formData.append('password', newUserData.password);
                formData.append('password_confirmation', newUserData.password_confirmation);
            }
            
            if (newUserData.photo && isPhotoChanged) {
                formData.append('photo', newUserData.photo);
            }
            
            console.log("AVANT ENVOI - Contenu du FormData:");
            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }
            
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user ? user.access_token : null;
            
            console.log("Token utilisé:", token);
            
            const response = await axios.post("http://127.0.0.1:8000/api/user/update", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            console.log("Réponse du serveur:", response.data);
            
            alert("Profil mis à jour !");
            
            setUser(response.data.user);
            setNewUserData({
                ...newUserData,
                lastname: response.data.user.lastname,
                firstname: response.data.user.firstname,
                email: response.data.user.email,
                password: "",
                password_confirmation: ""
            });
            
            AuthService.updateUser(response.data.user);
            updateUser(response.data.user);
            setIsPhotoChanged(false);
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error.response?.data || error);
            setError(error.response?.data?.message || "Erreur lors de la mise à jour du profil");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Voulez-vous vraiment supprimer votre compte ?")) {
            try {
                await axiosInstance.delete("/user/delete");
                AuthService.logout();
                navigate("/login");
            } catch (error) {
                console.error("Erreur lors de la suppression du compte", error);
                setError("Erreur lors de la suppression du compte");
            }
        }
    };

    return (
        <div className="profile-container">
            <h2>Profil de {user.firstname} {user.lastname}</h2>
            {error && <div className="error-message">{error}</div>}
            
            <div className="profile-photo">
                {photoPreview ? (
                    <img src={photoPreview} alt={`${user.firstname} ${user.lastname}`} />
                ) : (
                    <div className="no-photo">Aucune photo</div>
                )}
            </div>
            
            <form onSubmit={handleUpdate} encType="multipart/form-data">
                <label>Nom:</label>
                <input 
                    type="text" 
                    name="lastname" 
                    value={newUserData.lastname} 
                    onChange={handleChange} 
                />
                
                <label>Prénom:</label>
                <input 
                    type="text" 
                    name="firstname" 
                    value={newUserData.firstname} 
                    onChange={handleChange} 
                />
                
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={newUserData.email} 
                    onChange={handleChange} 
                />
                
                <label>Photo de profil:</label>
                <input 
                    type="file" 
                    name="photo" 
                    onChange={handleChange}
                    accept="image/*"
                />
                
                <label>Nouveau mot de passe:</label>
                <input 
                    type="password" 
                    name="password" 
                    value={newUserData.password} 
                    onChange={handleChange} 
                />
                
                <label>Confirmer le mot de passe:</label>
                <input 
                    type="password" 
                    name="password_confirmation" 
                    value={newUserData.password_confirmation} 
                    onChange={handleChange} 
                />
                
                <button type="submit">Mettre à jour</button>
            </form>
            <button onClick={handleDelete} className="delete-button">Supprimer mon compte</button>
            <button onClick={() => navigate("/")} className="back-button">Retour à l'accueil</button>
        </div>
    );
};

export default Profile;