import React, { useState, useEffect } from "react";
import axios from "axios";
import AddHero from "./AddHero"; 

const SuperheroesList = () => {
  const [heroes, setHeroes] = useState([]);

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
  }, []);

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
      <AddHero setHeroes={setHeroes} />
    </div>
  );
};

export default SuperheroesList;