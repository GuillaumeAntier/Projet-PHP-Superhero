import React, { useState, useEffect } from "react";
import EntitySelector from "./EntitySelector";
import axios from "axios";

const UpdateHero = ({ heroId, setHeroes }) => {
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

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/superheroes/${heroId}`);
                const heroData = response.data;
                setFormData({
                    ...heroData,
                    superpowers: heroData.superpowers.map(sp => sp.id),
                    gadgets: heroData.gadgets.map(g => g.id),
                });
            } catch (error) {
                console.error("Erreur lors de la récupération du super-héros:", error);
            }
        };
        fetchHero();
    }, [heroId]);

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        if (type === "file") {
            setFormData({
                ...formData,
                [name]: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleMultiSelect = (event) => {
        const { name, options } = event.target;
        const selectedValues = Array.from(options).filter(option => option.selected).map(option => option.value);
        setFormData({
            ...formData,
            [name]: selectedValues,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formData[key].forEach((value) => data.append(`${key}[]`, value));
            } else {
                data.append(key, formData[key]);
            }
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/superheroes/${heroId}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setHeroes((prevHeroes) => prevHeroes.map(hero => hero.id === heroId ? response.data : hero));
            console.log("Super-héros mis à jour avec succès:", response.data);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du super-héros:", error);
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
                        value={formData.real_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="required">
                    <input
                        type="text"
                        name="hero_name"
                        placeholder="Nom du héros"
                        value={formData.hero_name}
                        onChange={handleChange}
                    />
                </div>

                <div className="required">
                    <select name="gender" value={formData.gender} onChange={handleChange}>
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
                        value={formData.description}
                        onChange={handleChange}
                    ></textarea>
                </div>

                <div className="required">
                    <EntitySelector
                        name="planet_id"
                        label="Planète"
                        apiEndpoint="http://127.0.0.1:8000/api/planets"
                        value={formData.planet_id}
                        handleChange={handleChange}
                    />
                </div>

                <div className="required">
                    <EntitySelector
                        name="city_id"
                        label="Ville"
                        apiEndpoint="http://127.0.0.1:8000/api/cities"
                        value={formData.city_id}
                        handleChange={handleChange}
                    />
                </div>

                <EntitySelector
                    name="team_id"
                    label="Équipe"
                    apiEndpoint="http://127.0.0.1:8000/api/teams"
                    value={formData.team_id}
                    requiresDescription={true}
                    handleChange={handleChange}
                />

                <EntitySelector
                    name="vehicle_id"
                    label="Véhicule"
                    apiEndpoint="http://127.0.0.1:8000/api/vehicles"
                    value={formData.vehicle_id}
                    requiresDescription={true}
                    handleChange={handleChange}
                />

                <EntitySelector
                    name="superpowers"
                    label="Super-pouvoirs"
                    apiEndpoint="http://127.0.0.1:8000/api/superpowers"
                    value={formData.superpowers}
                    requiresDescription={true}
                    multiple={true}
                    handleChange={handleMultiSelect}
                />

                <EntitySelector
                    name="gadgets"
                    label="Gadgets"
                    apiEndpoint="http://127.0.0.1:8000/api/gadgets"
                    value={formData.gadgets}
                    requiresDescription={true}
                    multiple={true}
                    handleChange={handleMultiSelect}
                />

                <div>
                    <label>Photo:</label>
                    <input type="file" name="photo" onChange={handleChange} />
                </div>

                <div className="required-note">Les champs marqués d'une * sont obligatoires</div>
                <button type="submit">Mettre à jour</button>
            </form>
        </div>
    );
};

export default UpdateHero;