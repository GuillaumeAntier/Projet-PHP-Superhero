<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { fetchData } from "./Api"; // Assure-toi d'importer ton API

const SuperheroesList = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
=======
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import AddHero from "./AddHero";
import HeroDetail from "./HeroDetail";

const SuperheroesList = () => {
  const [heroes, setHeroes] = useState([]);
>>>>>>> godwin

  useEffect(() => {
    const getHeroes = async () => {
      try {
<<<<<<< HEAD
        const result = await fetchData("/superhero");
        console.log("Données reçues :", result);
        setHeroes(result); // Stocke les données
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
=======
        const response = await axios.get("http://127.0.0.1:8000/api/superhero");
        setHeroes(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des super-héros:", error);
>>>>>>> godwin
      }
    };

    getHeroes();
  }, []);

<<<<<<< HEAD
  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

=======
>>>>>>> godwin
  return (
    <div>
      <h1>Liste des Super-Héros</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
<<<<<<< HEAD
            <strong>{hero.heroname}</strong> - {hero.realname} ({hero.planet})
=======
            <Link to={`/hero/${hero.id}`}>
              <span className="hero-name">{hero.heroname}</span>
            </Link>
>>>>>>> godwin
            <br />
            <em>{hero.description}</em>
          </li>
        ))}
      </ul>
<<<<<<< HEAD
=======
      <AddHero setHeroes={setHeroes} />
>>>>>>> godwin
    </div>
  );
};

<<<<<<< HEAD
export default SuperheroesList;
=======
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SuperheroesList />} />
        <Route path="/hero/:id" element={<HeroDetail />} /> {/* Ajout de la route pour HeroDetail */}
      </Routes>
    </Router>
  );
};

export default App;
>>>>>>> godwin
