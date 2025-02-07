import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api"; 

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
};

export const fetchHeroById = async (id) => {
  try {
    const response = await api.get(`/superhero/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du héros :", error);
    throw error;
  }
};