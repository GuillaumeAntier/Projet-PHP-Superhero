import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddHero from "./AddHero";
import HeroDetail from "./HeroDetail";
import UpdateHero from "./UpdateHero";
import "./css/App.css";

const SuperheroesList = ({ heroes, setHeroes }) => {
  useEffect(() => {
    const getHeroes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/superhero");
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
        <h1 className="logo">MyHeroLibrary</h1>
        <input type="text" placeholder="Votre texte ici..." className="search-bar" />
        <div className="profile-icon"></div>
      </header>

      <div className="filters">
        <button>Planète</button>
        <button>Pouvoir</button>
        <button>Équipe</button>
        <button>Ville</button>
        <button>Sexe</button>
      </div>

      <div className="hero-grid">
        {heroes.map((hero) => (
          <div key={hero.id} className="hero-card">
            <Link to={`/hero/${hero.id}`} className="hero-link">
              <img src={hero.image} alt={hero.heroname} className="hero-image" />
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
        <Route path="/" element={<SuperheroesList heroes={heroes} setHeroes={setHeroes} />} />
        <Route path="/hero/:id" element={<HeroDetail setHeroes={setHeroes} />} />
        <Route path="/add-hero" element={<AddHero setHeroes={setHeroes} />} />
        <Route path="/update-hero/:id" element={<UpdateHero setHeroes={setHeroes} />} />
      </Routes>
    </Router>
  );
};

export default App;