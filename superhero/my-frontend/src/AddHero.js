import React, { useState } from "react";
import axios from "axios";

const AddSuperhero = ({ setHeroes }) => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/superhero", formData);
      console.log("Super-héros ajouté :", response.data);

      setHeroes((prevHeroes) => [...prevHeroes, response.data]);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error.response?.data || error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="heroname" placeholder="Nom du héros" onChange={handleChange} />
      <input type="text" name="realname" placeholder="Nom réel" onChange={handleChange} />
      <input type="text" name="sexe" placeholder="Sexe" onChange={handleChange} />
      <input type="text" name="planet" placeholder="Planète" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <input type="text" name="superpowers" placeholder="Super-Pouvoirs" onChange={handleChange} />
      <input type="text" name="protectedcountry" placeholder="Ville Protégée" onChange={handleChange} />
      <input type="text" name="gadjets" placeholder="Gadjets" onChange={handleChange} />
      <input type="text" name="team" placeholder="Equipe" onChange={handleChange} />
      <input type="text" name="car" placeholder="Véhicule" onChange={handleChange} />
      <button type="submit">Ajouter</button>
      
    </form> 
  );
};

export default AddSuperhero;