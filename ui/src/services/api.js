import axios from "axios";

const API_BASE_URL = "https://examen-web2-2-std23106-backend.onrender.com";

export const getPossessions = () => axios.get(`${API_BASE_URL}/possession`);

export const createPossession = (data) =>
  axios.post(`${API_BASE_URL}/possession`, data);
export const updatePossession = (libelle, data) =>
  axios.put(`${API_BASE_URL}/possession/${libelle}`, data);
export const closePossession = (libelle) =>
  axios.put(`${API_BASE_URL}/possession/${libelle}/close`);
export const getValeurPatrimoine = (date) =>
  axios.get(`${API_BASE_URL}/patrimoine/${date}`);
export const getValeurPatrimoineRange = (params) =>
  axios.post(`${API_BASE_URL}/patrimoine/range`, params);
