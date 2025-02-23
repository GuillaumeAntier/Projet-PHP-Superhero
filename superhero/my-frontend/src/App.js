import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import AddHero from "./AddHero";
import HeroDetail from "./HeroDetail";
import UpdateHero from "./UpdateHero";
import Login from "./components/Login";
import Register from "./components/Register";
import AuthService from "./services/auth.service";
import { LogOut, Search, User } from "lucide-react";
import "./css/App.css";

const PrivateRoute = ({ children }) => {
    const user = AuthService.getCurrentUser();
    return user ? children : <Navigate to="/login" />;
};

const SuperheroesList = ({ heroes, setHeroes }) => {
    const navigate = useNavigate();
    const user = AuthService.getCurrentUser();

    const handleLogout = () => {
        AuthService.logout();
        navigate("/login");
    };

    useEffect(() => {
        const getHeroes = async () => {
            try {
                const user = AuthService.getCurrentUser();
                const response = await axios.get("http://127.0.0.1:8000/api/superhero", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setHeroes(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des super-héros:", error);
            }
        };
        getHeroes();
    }, [setHeroes]);

    return (
        <div className="container">
            <header className="header">
                <div className="header-left">
                    <h1 className="logo">MyHeroLibrary</h1>
                </div>
                <div className="header-center">
                    <div className="search-container">
                        <Search className="search-icon" size={20} />
                        <input type="text" placeholder="Rechercher un héros..." className="search-bar" />
                    </div>
                </div>
                <div className="header-right">
                    <div className="user-info">
                        <User size={20} />
                        <span className="username">{user?.user?.name}</span>
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                        <LogOut size={20} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </header>

            <div className="filters">
                {['Planète', 'Pouvoir', 'Équipe', 'Ville', 'Sexe'].map((filter) => (
                    <button key={filter} className="filter-button">
                        {filter}
                    </button>
                ))}
            </div>

            <div className="hero-grid">
                {heroes.map((hero) => (
                    <div key={hero.id} className="hero-card">
                        <Link to={`/hero/${hero.id}`} className="hero-link">
                            <div className="hero-image-container">
                                <img src={hero.image || "/api/placeholder/300/400"} alt={hero.heroname} className="hero-image" />
                            </div>
                            <span className="hero-name">{hero.heroname}</span>
                        </Link>
                    </div>
                ))}
            </div>

            <Link to="/add-hero" className="add-hero-button">
                Ajouter un super-héros
            </Link>
        </div>
    );
};

const App = () => {
    const [heroes, setHeroes] = useState([]);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <PrivateRoute>
                        <SuperheroesList heroes={heroes} setHeroes={setHeroes} />
                    </PrivateRoute>
                } />
                <Route path="/hero/:id" element={
                    <PrivateRoute>
                        <HeroDetail setHeroes={setHeroes} />
                    </PrivateRoute>
                } />
                <Route path="/add-hero" element={
                    <PrivateRoute>
                        <AddHero setHeroes={setHeroes} />
                    </PrivateRoute>
                } />
                <Route path="/update-hero/:id" element={
                    <PrivateRoute>
                        <UpdateHero setHeroes={setHeroes} />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;