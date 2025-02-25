import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import "../css/Auth.css";

const Register = () => {
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        email: '',
        password: '',
        password_confirmation: '',
        photo: null
    });
    const [photoPreview, setPhotoPreview] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setFormData({
                ...formData,
                photo: e.target.files[0]
            });
            if (e.target.files[0]) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    setPhotoPreview(e.target.result);
                };
                fileReader.readAsDataURL(e.target.files[0]);
            }
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('lastname', formData.lastname);
            formDataToSend.append('firstname', formData.firstname);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('password', formData.password);
            formDataToSend.append('password_confirmation', formData.password_confirmation);
            
            if (formData.photo) {
                formDataToSend.append('photo', formData.photo);
            }
            
            await AuthService.register(formDataToSend);
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors de l\'inscription');
        }
    };

    return (
        <div className="register-container">
            <h2>Créer un compte</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Prénom:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Photo de profil:</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleChange}
                        accept="image/*"
                    />
                    {photoPreview && (
                        <div className="photo-preview">
                            <img src={photoPreview} alt="Prévisualisation" style={{ maxWidth: '200px', maxHeight: '200px' }} />
                        </div>
                    )}
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Confirmer le mot de passe:</label>
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;