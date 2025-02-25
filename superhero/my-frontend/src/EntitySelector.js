import React, { useState, useEffect } from "react";
import axios from "axios";

const EntitySelector = ({ name, label, apiEndpoint, requiresDescription = false, multiple = false, handleChange }) => {
  const [entities, setEntities] = useState([]);
  const [newEntity, setNewEntity] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    axios.get(apiEndpoint).then((res) => {
      setEntities(res.data);
    }).catch(error => {
      console.error(`Erreur lors du chargement des ${label.toLowerCase()} :`, error);
    });
  }, [apiEndpoint, label]);  

  const handleEntityChange = (event) => {
    event.preventDefault();
    const value = event.target.value;

    if (value === "new") {
      setShowInput(true);
    } else {
      setShowInput(false);
      handleChange(event); 
    }
  };

  const addNewEntity = async (event) => {
    event.preventDefault();
    if (newEntity.trim() === "") return;

    try {
      const entityData = { name: newEntity };
      if (requiresDescription) {
        entityData.description = newDescription;
      }

      const response = await axios.post(apiEndpoint, entityData);

      if (response.data && response.data.id) {
        const addedEntity = response.data;
        setEntities([...entities, addedEntity]); 
        setNewEntity("");
        setNewDescription(""); 
        setShowInput(false);

        handleChange({ target: { name, value: multiple ? [addedEntity.id] : addedEntity.id } });
      }
    } catch (error) {
      console.error(`Erreur lors de l'ajout de ${label.toLowerCase()} :`, error);
    }
  };


  return (
    <div>
      <label>{label} :</label>
      <select name={name} onChange={handleEntityChange} multiple={multiple}>
        {!multiple && <option value="">Sélectionner {label.toLowerCase()}</option>}
        {entities.map((entity) => (
          <option key={entity.id} value={entity.id}>
            {entity.name}
          </option>
        ))}
        <option value="new">+ Ajouter {label.toLowerCase()}</option>
      </select>

      {showInput && (
        <div>
          <input
            type="text"
            placeholder={`Nom de ${label.toLowerCase()}`}
            value={newEntity}
            onChange={(e) => setNewEntity(e.target.value)}
          />
          {requiresDescription && (
            <input
              type="text"
              placeholder={`Description de ${label.toLowerCase()}`}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          )}
          <button onClick={addNewEntity}>Ajouter</button>
        </div>
      )}
    </div>
  );
};

export default EntitySelector;
