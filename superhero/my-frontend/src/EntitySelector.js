import React, { useState, useEffect } from "react";
import axios from "axios";

const EntitySelector = ({ name, label, apiEndpoint, multiple = false, handleChange }) => {
  const [entities, setEntities] = useState([]);
  const [newEntity, setNewEntity] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    axios.get(apiEndpoint).then((res) => {
      setEntities(res.data);
    });
  }, [apiEndpoint]);

  const handleEntityChange = (event) => {
    if (event.target.value === "new") {
      setShowInput(true);
    } else {
      setShowInput(false);
      handleChange(event);
    }
  };

  const addNewEntity = async () => {
    if (newEntity.trim() === "") return;

    try {
      const response = await axios.post(apiEndpoint, { name: newEntity });

      const addedEntity = response.data;
      setEntities([...entities, addedEntity]);
      setNewEntity("");
      setShowInput(false);
      handleChange({ target: { name, value: multiple ? [addedEntity.id] : addedEntity.id } });
    } catch (error) {
      console.error(`Erreur lors de l'ajout de ${label}`, error);
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
          <button onClick={addNewEntity}>Ajouter</button>
        </div>
      )}
    </div>
  );
};

export default EntitySelector;
