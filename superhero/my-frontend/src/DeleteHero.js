import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteHero = ({ heroId, setHeroes }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/superheroes/${heroId}`);
      console.log("Super-héros supprimé avec succès !");
  
      setHeroes((prevHeroes) => {
        if (Array.isArray(prevHeroes)) {
          return prevHeroes.filter((hero) => hero.id !== heroId);
        } else {
          console.error("prevHeroes n'est pas un tableau", prevHeroes);
          return prevHeroes; // Retourne prevHeroes sans modification si ce n'est pas un tableau
        }
      });
  
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la suppression :", error.response?.data || error.message);
  
      if (error.response?.data?.message) {
        alert(error.response.data.message);
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