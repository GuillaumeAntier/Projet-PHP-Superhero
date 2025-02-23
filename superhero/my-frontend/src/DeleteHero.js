import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteHero = ({ heroId, setHeroes }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/superhero/${heroId}`);
      console.log("Super-héros supprimé avec succès !");

      setHeroes((prevHeroes) => prevHeroes.filter((hero) => hero.id !== heroId));

      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.response?.data || error.message);

      if (error.response?.data?.message === "Superhero deleted") {
        setHeroes((prevHeroes) => prevHeroes.filter((hero) => hero.id !== heroId));
        navigate("/");
      }
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Supprimer ce héros
    </button>
  );
};

export default DeleteHero;