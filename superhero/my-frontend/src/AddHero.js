import { useState } from "react";
import axios from "axios";
import EntitySelector from "./EntitySelector";
import "./css/AddHero.css";

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
    <div className="form-container">
      <form onSubmit={handleSubmit}>
      <div className="required">
        <input
          type="text"
          name="real_name"
          placeholder="Nom réel"
          onChange={handleChange}
        />
      </div>

      <div className="required">
        <input
          type="text"
          name="hero_name"
          placeholder="Nom du héros"
          onChange={handleChange}
        />
      </div>

      <div className="required">
        <select name="gender" onChange={handleChange}>
          <option value="">Sélectionnez un genre</option>
          <option value="M">Masculin</option>
          <option value="F">Féminin</option>
          <option value="NB">Non Défini</option>
        </select>
      </div>

      <div className="required">
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="required">
        <EntitySelector
          name="planet_id"
          label="Planète"
          apiEndpoint="http://127.0.0.1:8000/api/planets"
          handleChange={handleChange}
        />
      </div>

      <div className="required">
        <EntitySelector
          name="city_id"
          label="Ville"
          apiEndpoint="http://127.0.0.1:8000/api/cities"
          handleChange={handleChange}
        />
      </div>

        <EntitySelector
          name="team_id"
          label="Équipe"
          apiEndpoint="http://127.0.0.1:8000/api/teams"
          requiresDescription={true}
          handleChange={handleChange}
        />

        <EntitySelector
          name="vehicle_id"
          label="Véhicule"
          apiEndpoint="http://127.0.0.1:8000/api/vehicles"
          requiresDescription={true}
          handleChange={handleChange}
        />

        <EntitySelector
          name="superpowers"
          label="Super-pouvoirs"
          apiEndpoint="http://127.0.0.1:8000/api/superpowers"
          requiresDescription={true}
          multiple={true}
          handleChange={handleMultiSelect}
        />

        <EntitySelector
          name="gadgets"
          label="Gadgets"
          apiEndpoint="http://127.0.0.1:8000/api/gadgets"
          requiresDescription={true}
          multiple={true}
          handleChange={handleMultiSelect}
        />
        <div className="required-note">Les champs marqués d'une * sont obligatoires</div>
        <button type="submit">Ajouter</button>
      </form>
      
    </div>



  );
};

export default AddSuperhero;
