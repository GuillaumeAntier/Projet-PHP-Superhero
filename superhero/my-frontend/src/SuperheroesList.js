import React, { useEffect, useState } from "react";
import { fetchData } from "./Api";
import { Link } from "react-router-dom";

const SuperheroesList = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHeroes = async () => {
      try {
        const result = await fetchData("/superhero");
        setHeroes(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getHeroes();
  }, []);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">Erreur : {error}</div>;

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">MyHeroLibrary</h1>
        <input
          type="text"
          placeholder="Votre texte ici..."
          className="search-bar"
        />
        <div className="pseudo">Pseudo</div>
      </header>
      <nav className="filters">
        <button>Planète</button>
        <button>Pouvoir</button>
        <button>Équipe</button>
        <button>Ville</button>
        <button>Sexe</button>
      </nav>
      <div className="hero-grid">
        {heroes.map((hero) => (
          <div key={hero.id} className="hero-card">
            <Link to={`/hero/${hero.id}`}>
              <span className="hero-name">{hero.heroname}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuperheroesList;
