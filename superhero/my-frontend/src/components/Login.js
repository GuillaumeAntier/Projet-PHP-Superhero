import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from '../services/auth.service';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userData = await AuthService.login(email, password);
            onLogin(userData);
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Une erreur est survenue');
        }
    };

    return (
        <div className="login-container">
            <h2>Connexion</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Mot de passe:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Se connecter</button>
            </form>
            <div className="register-link">
                Pas encore de compte ?
                <Link to="/register">Créer un compte</Link>
            </div>
        </div>
    );
};

export default Login;