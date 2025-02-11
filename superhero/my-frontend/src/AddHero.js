import { useState } from "react";
import axios from "axios";
import EntitySelector from "./EntitySelector";

const AddSuperhero = ({ setHeroes }) => {
  const [formData, setFormData] = useState({
    real_name: "",
    hero_name: "",
    gender: "",
    description: "",
    planet_id: "",
    city_id: "",
    team_id: "",
    vehicle_id: "",
    superpowers: [], 
    gadgets: [], 
    user_id: 1,    
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = (e) => {
    const selectedOptions = [...e.target.selectedOptions].map((option) => option.value);
    setFormData({ ...formData, [e.target.name]: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/superheroes", formData);
      console.log("Super-héros ajouté :", response.data);
      window.location.reload(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="real_name" placeholder="Nom réel" onChange={handleChange} />
      <input type="text" name="hero_name" placeholder="Nom du héros" onChange={handleChange} />
      <input type="text" name="gender" placeholder="Sexe" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>

      <EntitySelector
        name="planet_id"
        label="Planète"
        apiEndpoint="http://127.0.0.1:8000/api/planets"
        handleChange={handleChange}
      />

      <EntitySelector
        name="city_id"
        label="Ville"
        apiEndpoint="http://127.0.0.1:8000/api/cities"
        handleChange={handleChange}
      />

      <EntitySelector
        name="team_id"
        label="Équipe"
        apiEndpoint="http://127.0.0.1:8000/api/teams"
        handleChange={handleChange}
      />

      <EntitySelector
        name="vehicle_id"
        label="Véhicule"
        apiEndpoint="http://127.0.0.1:8000/api/vehicles"
        handleChange={handleChange}
      />

      <EntitySelector
        name="superpowers"
        label="Super-pouvoirs"
        apiEndpoint="http://127.0.0.1:8000/api/superpowers"
        multiple={true}
        handleChange={handleMultiSelect}
      />

      <EntitySelector
        name="gadgets"
        label="Gadgets"
        apiEndpoint="http://127.0.0.1:8000/api/gadgets"
        multiple={true}
        handleChange={handleMultiSelect}
      />

      <button type="submit">Ajouter</button>
    </form>
  );
};

export default AddSuperhero;
