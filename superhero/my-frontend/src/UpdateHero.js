import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./css/UpdateHero.css";

const UpdateHero = ({ setHeroes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    heroname: "",
    realname: "",
    sexe: "",
    planet: "",
    description: "",
    superpowers: "",
    protectedcountry: "",
    gadjets: "",
    team: "",
    car: "",
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/superhero/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du super-héros :", error);
      }
    };

    fetchHero();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/superhero/${id}`, formData);
      console.log("Super-héros mis à jour avec succès !", response.data);

      setHeroes((prevHeroes) =>
        prevHeroes.map((hero) => (hero.id === parseInt(id) ? { ...hero, ...formData } : hero))
      );

      navigate(`/hero/${id}`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error.response?.data || error.message);

      if (error.response?.data?.message === "Superhero updated") {
        setHeroes((prevHeroes) =>
          prevHeroes.map((hero) => (hero.id === parseInt(id) ? { ...hero, ...formData } : hero))
        );
        navigate(`/hero/${id}`);
      }
    }
  };

  return (
    <div className="update-hero">
      <h1>Mettre à jour {formData.heroname}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom du héros :</label>
          <input
            type="text"
            name="heroname"
            placeholder="Nom du héros"
            value={formData.heroname || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nom réel :</label>
          <input
            type="text"
            name="realname"
            placeholder="Nom réel"
            value={formData.realname || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Sexe :</label>
          <input
            type="text"
            name="sexe"
            placeholder="Sexe"
            value={formData.sexe || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Planète :</label>
          <input
            type="text"
            name="planet"
            placeholder="Planète"
            value={formData.planet || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Description :</label>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description || ""}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label>Super-Pouvoirs :</label>
          <input
            type="text"
            name="superpowers"
            placeholder="Super-Pouvoirs"
            value={formData.superpowers || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ville Protégée :</label>
          <input
            type="text"
            name="protectedcountry"
            placeholder="Ville Protégée"
            value={formData.protectedcountry || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Gadjets :</label>
          <input
            type="text"
            name="gadjets"
            placeholder="Gadjets"
            value={formData.gadjets || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Équipe :</label>
          <input
            type="text"
            name="team"
            placeholder="Équipe"
            value={formData.team || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Véhicule :</label>
          <input
            type="text"
            name="car"
            placeholder="Véhicule"
            value={formData.car || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="update-button">Mettre à jour</button>
        <Link to={`/hero/${id}`} className="back-button">
          Retour
        </Link>
      </form>
    </div>
  );
};

export default UpdateHero;