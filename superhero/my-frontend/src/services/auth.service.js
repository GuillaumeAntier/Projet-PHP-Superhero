import axios from 'axios';

const API_URL = "http://127.0.0.1:8000/api/";

const login = async (email, password) => {
  try {
    const response = await axios.post(API_URL + "login", {
      email,
      password
    });
    
    if (response.data.access_token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const register = async (name, email, password, password_confirmation) => {
  try {
    const response = await axios.post(API_URL + "register", {
      name,
      email,
      password,
      password_confirmation
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  login,
  logout,
  register,
  getCurrentUser
};

export default AuthService;