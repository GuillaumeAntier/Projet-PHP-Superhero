import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteHero from "./DeleteHero";
import UpdateHero from "./UpdateHero";
import "./css/HeroDetail.css";

const HeroDetail = ({ heroId, setHeroes, user }) => {
    const [hero, setHero] = useState(null);
    const [planets, setPlanets] = useState([]);
    const [cities, setCities] = useState([]);
    const [teams, setTeams] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [superpowers, setSuperpowers] = useState([]);
    const [gadgets, setGadgets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);

    useEffect(() => {
        const getHero = async () => {
            try {
                const result = await axios.get(`http://127.0.0.1:8000/api/superheroes/${heroId}`);
                setHero(result.data);
                axios.get("http://127.0.0.1:8000/api/planets").then((res) => setPlanets(res.data));
                axios.get("http://127.0.0.1:8000/api/cities").then((res) => setCities(res.data));
                axios.get("http://127.0.0.1:8000/api/teams").then((res) => setTeams(res.data));
                axios.get("http://127.0.0.1:8000/api/vehicles").then((res) => setVehicles(res.data));

                axios.get(`http://127.0.0.1:8000/api/superhero/${heroId}/superpowers`)
                    .then((res) => setSuperpowers(res.data))
                    .catch((error) => console.error(error));

                axios.get(`http://127.0.0.1:8000/api/superhero/${heroId}/gadgets`)
                    .then((res) => setGadgets(res.data))
                    .catch((error) => console.error(error));

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getHero();
    }, [heroId]);

    const getEntityById = (id, entities) => {
        return entities.find(entity => entity.id === id);
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;
    if (!hero) return <div>Aucun héros trouvé</div>;

    const planet = getEntityById(hero.planet_id, planets);
    const city = getEntityById(hero.city_id, cities);
    const team = getEntityById(hero.team_id, teams);
    const vehicle = getEntityById(hero.vehicle_id, vehicles);

    const openUpdatePopup = () => {
        setShowUpdatePopup(true);
    };

    const closeUpdatePopup = () => {
        setShowUpdatePopup(false);
    };

    return (
        <div className="hero-detail">
            <h2>{hero.hero_name} - {hero.real_name}</h2>
            {hero.photo && (
                <div className="hero-photo">
                    <img src={`http://127.0.0.1:8000/storage/${hero.photo}`} alt={hero.hero_name} />
                </div>
            )}
            <div>
                <div>
                    <strong>Genre: </strong> {hero.gender}
                </div>
                <strong>Description du Superhéro</strong> : {hero.description}
            </div>
            <div>
                <strong>Planète:</strong> {planet ? planet.name : "Inconnue"}
            </div>
            <div>
                <strong>Ville:</strong> {city ? city.name : "Inconnue"}
            </div>
            <div>
                <strong>Équipe:</strong> {team ? team.name : "Aucune"}
                {team && team.description && (
                    <p className="description">Description : {team.description}</p>
                )}
            </div>
            <div>
                <strong>Véhicule:</strong> {vehicle ? vehicle.name : "Aucun"}
                {vehicle && vehicle.description && (
                    <p className="description">Description : {vehicle.description}</p>
                )}
            </div>
            <div>
                <strong>Super-pouvoirs:</strong> {superpowers.length === 0 ? "Aucun" : ""}
                <ul>
                    {superpowers.map((superpower) => (
                        <li key={superpower.id}>
                            {superpower.name}
                            {superpower.description && (
                                <p className="description">Description : {superpower.description}</p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <strong>Gadgets:</strong> {gadgets.length === 0 ? "Aucun" : ""}
                <ul>
                    {gadgets.map((gadget) => (
                        <li key={gadget.id}>
                            {gadget.name}
                            {gadget.description && (
                                <p className="description">Description : {gadget.description}</p>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <strong>Crée par :</strong> {hero.user?.firstname + " " + hero.user?.lastname}
            </div>
            {hero.user?.id === user.id && (
                    <div className="button-group">
                        <button onClick={openUpdatePopup} className="update-button">Mettre à jour</button>
                        <DeleteHero heroId={hero.id} setHeroes={setHeroes} className="delete-button" />
                    </div>
                )}

            {showUpdatePopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <button onClick={closeUpdatePopup} className="close-button">X</button>
                        <UpdateHero heroId={hero.id} setHeroes={setHeroes} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroDetail;