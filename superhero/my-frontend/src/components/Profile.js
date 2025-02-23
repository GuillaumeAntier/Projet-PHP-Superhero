import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../Api";
import AuthService from "../services/auth.service";
import "../css/Profile.css";

const Profile = ({ updateUser }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: "", email: "" });
    const [newUserData, setNewUserData] = useState({ name: "", email: "", password: "", password_confirmation: "" });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/user");
                setUser(response.data);
                setNewUserData({ name: response.data.name, email: response.data.email, password: "", password_confirmation: "" });
            } catch (error) {
                console.error("Erreur lors de la récupération du profil", error);
            }
        };
        fetchUser();
    }, []);

    const handleChange = (e) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const dataToSend = { ...newUserData };
            if (!dataToSend.password) {
                delete dataToSend.password;
                delete dataToSend.password_confirmation;
            }
            const response = await axiosInstance.put("/user/update", dataToSend);
            alert("Profil mis à jour !");

            const updatedUser = { ...user, name: response.data.user.name, email: response.data.user.email };
            AuthService.updateUser(updatedUser);

            updateUser(updatedUser);

            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
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
            }
        }
    };

    return (
        <div className="profile-container">
            <h2>Profil de {user.name}</h2>
            <form onSubmit={handleUpdate}>
                <label>Nom:</label>
                <input type="text" name="name" value={newUserData.name} onChange={handleChange} />

                <label>Email:</label>
                <input type="email" name="email" value={newUserData.email} onChange={handleChange} />

                <label>Nouveau mot de passe:</label>
                <input type="password" name="password" value={newUserData.password} onChange={handleChange} />

                <label>Confirmer le mot de passe:</label>
                <input type="password" name="password_confirmation" value={newUserData.password_confirmation} onChange={handleChange} />

                <button type="submit">Mettre à jour</button>
            </form>
            <button onClick={handleDelete} className="delete-button">Supprimer mon compte</button>
            <button onClick={() => navigate("/")} className="back-button">Retour à l'accueil</button>
        </div>
    );
};

export default Profile;