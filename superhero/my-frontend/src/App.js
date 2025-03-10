import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import AddHero from "./AddHero";
import HeroDetail from "./HeroDetail";
import UpdateHero from "./UpdateHero";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import AuthService from "./services/auth.service";
import { LogOut, Search, User } from "lucide-react";
import "./css/App.css";
import { useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const user = AuthService.getCurrentUser();
    return user ? children : <Navigate to="/login" />;
};

const SuperheroesList = ({ heroes, setHeroes, user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        planète: '',
        pouvoir: '',
        équipe: '',
        ville: '',
        sexe: '',
        gadget: '',
        utilisateur: ''
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedHeroId, setSelectedHeroId] = useState(null);

    const openPopup = (heroId) => {
        setSelectedHeroId(heroId);
        setShowPopup(true);
    };

    const closePopup = () => {
        setSelectedHeroId(null);
        setShowPopup(false);
    };

    const handleLogout = () => {
        AuthService.logout();
        navigate("/login");
    };
    
    useEffect(() => { 
        if (location.pathname === "/") {
            setFilters({ groupBy: "" });
        }
    }, [location.pathname]);

    useEffect(() => {   
        const getHeroes = async () => {
            try {
                const user = AuthService.getCurrentUser();
                const response = await axios.get("http://127.0.0.1:8000/api/superheroes", {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                    params: filters
                });
                setHeroes(response.data || []); 
            } catch (error) {
                console.error("Erreur lors de la récupération des super-héros:", error);
                setHeroes([]); 
            }
        };
        getHeroes();
    }, [filters, setHeroes]);

    useEffect(() => {
        if (searchTerm.length > 0 && Array.isArray(heroes)) {
            const filtered = heroes.filter(hero =>
                hero.hero_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (hero.real_name && hero.real_name.toLowerCase().includes(searchTerm.toLowerCase()))
            );
            setSuggestions(filtered.slice(0, 5));
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, heroes]);

    const handleFilterChange = async (filterType) => {
        const isSameFilter = filters.groupBy === filterType.toLowerCase();
        const updatedFilters = isSameFilter ? {} : { groupBy: filterType.toLowerCase() };
        setFilters(updatedFilters);
        console.log("Filtres:", updatedFilters);
    
        try {
            const user = AuthService.getCurrentUser();
            const response = await axios.get("http://127.0.0.1:8000/api/superheroes", {
                headers: { Authorization: `Bearer ${user.token}` },
                params: updatedFilters,
            });
            setHeroes(response.data || []); 
        } catch (error) {
            console.error("Erreur lors de la récupération des super-héros:", error);
            setHeroes([]); 
        }
    };

    const groupHeroesByFilter = (heroes, filterType) => {
        const heroesArray = Object.values(heroes).flat();
        return heroesArray.reduce((acc, hero) => {
            let keys = ["Inconnu"];
            if (filterType === "planète") keys = [hero.planet?.name || "Inconnu"];
            if (filterType === "pouvoir") keys = hero.superpowers?.map(p => p.name) || ["Pas de pouvoir"];
            if (filterType === "équipe") keys = [hero.team?.name || "Pas d'équipe"];
            if (filterType === "ville") keys = [hero.city?.name || "Inconnu"];
            if (filterType === "sexe") keys = [hero.gender || "Inconnu"];
            if (filterType === "gadget") keys = hero.gadgets?.map(g => g.name) || ["Pas de gadget"];
            if (filterType === "utilisateur") keys = [`${hero.user?.firstname || ''} ${hero.user?.lastname || ''}`.trim() || "Inconnu"];
    
            keys.forEach(key => {
                if (!acc[key]) acc[key] = [];
                acc[key].push(hero);
            });
    
            return acc;
        }, {});
    };
    
    const isFilterActive = Object.values(filters).some(value => value !== '');
    const groupedHeroes = isFilterActive 
        ? groupHeroesByFilter(heroes, filters.groupBy) 
        : { "Tous vos héros": heroes };
    
        const getDescription = (category) => {
            if (groupedHeroes[category].length > 0) {
                const hero = groupedHeroes[category][0];
                switch (filters.groupBy) {
                    case "planète":
                        return hero?.planet?.description || "";
                    case "pouvoir":
                        return hero.superpowers
                            ?.filter(p => p.name === category) 
                            .map(p => p.description)
                            .join(", ") || "Pas de description";
                    case "équipe":
                        return hero.team?.description || "";
                    case "ville":
                        return hero.city?.description || "";
                    case "gadget":
                        return hero.gadgets
                            ?.filter(g => g.name === category) 
                            .map(g => g.description)
                            .join(", ") || "Pas de description";
                    case "utilisateur":
                        return `${hero.user?.firstname || ''} ${hero.user?.lastname || ''}`.trim() || "";
                    default:
                        return "";
                }
            }
            return "";
        };

    return (
        <div className="container">
            <header className="header">
                <div className="header-left">
                    <h1 className="logo">MyHeroLibrary</h1>
                </div>
                <div className="header-center">
                    <div className="search-container">
                        <Search className="search-icon" size={20} />
                        <input 
                            type="text" 
                            placeholder="Rechercher un héros..." 
                            className="search-bar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {suggestions.length > 0 && (
                            <ul className="autocomplete-list">
                                {suggestions.map((hero) => (
                                    <li 
                                        key={hero.id} 
                                        className="autocomplete-item"
                                        onClick={() => {
                                            openPopup(hero.id);
                                            setSearchTerm(""); 
                                            setSuggestions([]);
                                        }}
                                    >
                                        {`${hero.hero_name} - ${hero.real_name}`}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
                <div className="header-right">
                    <div className="user-info">
                        <User size={20} />
                        <Link to="/profile" className="username">{user?.firstname}</Link>
                    </div>
                    <button onClick={handleLogout} className="logout-button">
                        <LogOut size={20} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            </header>
    
            <div className="filters">
                {['Planète', 'Pouvoir', 'Équipe', 'Ville', 'Sexe', 'Gadget', "Utilisateur"].map((filter) => (
                    <button 
                        key={filter} 
                        className={`filter-button ${filters.groupBy === filter.toLowerCase() ? 'active' : ''}`}
                        onClick={() => handleFilterChange(filter)}
                    >
                        Trier par {filter}
                    </button>
                ))}
            </div>

            <div className="container">
                {Object.keys(groupedHeroes).map((category) => (
                    <div key={category}>
                        <h2>{category}</h2>
                        <div className="category-description">
                            <h4>{getDescription(category)}</h4>
                        </div>
                        <div className="hero-grid">
                            {Array.isArray(groupedHeroes[category]) && groupedHeroes[category].map((hero) => (
                                <div key={hero.id} className="hero-card" onClick={() => openPopup(hero.id)}>
                                    <div className="hero-link">
                                        <div className="hero-image-container">
                                            <img 
                                                src={hero.photo ? `http://127.0.0.1:8000/storage/${hero.photo}` : "/api/placeholder/300/400"} 
                                                alt={hero.hero_name} 
                                                className="hero-image" 
                                            />
                                        </div>
                                        <span className="hero-name">{hero.hero_name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="container">
                <button onClick={() => openPopup(null)} className="add-hero-button">
                    Ajouter un super-héros
                </button>
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <button onClick={closePopup} className="close-button">X</button>
                            {selectedHeroId ? (
                                <HeroDetail heroId={selectedHeroId} setHeroes={setHeroes} user={user} />
                            ) : (
                                <AddHero setHeroes={setHeroes} />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const App = () => {
    const [heroes, setHeroes] = useState([]);
    const [user, setUser] = useState(AuthService.getCurrentUser()?.user || null);

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    };

    const handleLogin = (userData) => {
        setUser(userData.user);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <PrivateRoute>
                        <SuperheroesList heroes={heroes} setHeroes={setHeroes} user={user} />
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
                <Route path="/profile" element={
                    <PrivateRoute>
                        <Profile updateUser={updateUser} />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;