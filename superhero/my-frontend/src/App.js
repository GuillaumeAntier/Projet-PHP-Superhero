import React, { useEffect, useState } from "react";
import { fetchData } from "./Api"; // Assure-toi d'importer ton API

const SuperheroesList = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHeroes = async () => {
      try {
        const result = await fetchData("/superhero");
        console.log("Données reçues :", result);
        setHeroes(result); // Stocke les données
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getHeroes();
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div>
      <h1>Liste des Super-Héros</h1>
      <ul>
        {heroes.map((hero) => (
          <li key={hero.id}>
            <strong>{hero.heroname}</strong> - {hero.realname} ({hero.planet})
            <br />
            <em>{hero.description}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuperheroesList;
