import { useState } from "react";
import axios from "axios";
import EntitySelector from "./EntitySelector";
import "./css/AddHero.css";

const AddHero = ({ setHeroes }) => {
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
        photo: null,
    });

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleMultiSelect = (e) => {
        const selectedOptions = [...e.target.selectedOptions].map((option) => option.value);
        setFormData({ ...formData, [e.target.name]: selectedOptions });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('real_name', formData.real_name);
        data.append('hero_name', formData.hero_name);
        data.append('gender', formData.gender);
        data.append('description', formData.description);
        data.append('planet_id', formData.planet_id);
        data.append('city_id', formData.city_id);
        data.append('team_id', formData.team_id);
        data.append('vehicle_id', formData.vehicle_id);

        if (Array.isArray(formData.superpowers)) {
            formData.superpowers.forEach((power) => data.append('superpowers[]', power));
        }
        if (Array.isArray(formData.gadgets)) {
            formData.gadgets.forEach((gadget) => data.append('gadgets[]', gadget));
        }

        if (formData.photo) {
            data.append('photo', formData.photo);
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/superheroes", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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

                <div>
                    <label>Photo:</label>
                    <input type="file" name="photo" onChange={handleChange} />
                </div>

                <div className="required-note">Les champs marqués d'une * sont obligatoires</div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default AddHero;