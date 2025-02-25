import React, { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import AuthService from '../services/auth.service';
import '../css/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AuthService.register(
                formData.name,
                formData.email,
                formData.password,
                formData.password_confirmation
            );
            navigate('/login');
        } catch (error) {
            setError(error.response?.data?.message || 'Erreur lors de l\'inscription');
        }
    };

    return (
        <div className="register-container">
            <h2>Créer un compte</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nom:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
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
            <div className="login-link">
                    Déjà un compte ? 
                    <Link to="/Login">Connectez vous</Link>
            </div>
        </div>
    );
};

export default Register;