import React, { useState, useEffect } from "react";
import axios from "axios";
import AddHero from "./AddHero";

const SuperheroesList = () => {
  const [heroes, setHeroes] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [cities, setCities] = useState([]);
  const [teams, setTeams] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const getHeroes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/superheroes");
        setHeroes(response.data);
        axios.get("http://127.0.0.1:8000/api/planets").then((res) => setPlanets(res.data));
        axios.get("http://127.0.0.1:8000/api/cities").then((res) => setCities(res.data));
        axios.get("http://127.0.0.1:8000/api/teams").then((res) => setTeams(res.data));
        axios.get("http://127.0.0.1:8000/api/vehicles").then((res) => setVehicles(res.data));
      } catch (error) {
        console.error("Erreur lors de la récupération des super-héros:", error);
      }
    };

    getHeroes();
  }, []);

  const getEntityById = (id, entities) => {
    return entities.find(entity => entity.id === id);
  };

  return (
    <div>
      <h1>Liste des Super-Héros</h1>
      <AddHero setHeroes={setHeroes} />

      <ul>
        {heroes.map((hero) => {
          const planet = getEntityById(hero.planet_id, planets);
          const city = getEntityById(hero.city_id, cities);
          const team = getEntityById(hero.team_id, teams);
          const vehicle = getEntityById(hero.vehicle_id, vehicles);

          return (
            <li key={hero.id}>
              <strong>{hero.hero_name}</strong> - {hero.real_name}
              <br />
              <em>{hero.description}</em>
              <br />
              <strong>Planète:</strong> {planet ? planet.name : "Inconnue"}
              <br />
              <strong>Ville:</strong> {city ? city.name : "Inconnue"}
              <br />
              <strong>Équipe:</strong> {team ? team.name : "Aucune"}
              <br />
              <strong>Véhicule:</strong> {vehicle ? vehicle.name : "Aucun"}
              <br />
              <strong>Super-pouvoirs:</strong>
              <ul>
                {hero.superpowers && hero.superpowers.map((superpower) => (
                  <li key={superpower.id}>{superpower.name}</li>
                ))}
              </ul>
              <br />
              <strong>Gadgets:</strong>
              <ul>
                {hero.gadgets && hero.gadgets.map((gadget) => (
                  <li key={gadget.id}>{gadget.name}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SuperheroesList;
