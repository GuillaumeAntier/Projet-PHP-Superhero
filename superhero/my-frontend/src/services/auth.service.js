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

const register = async (formData) => {
    try {
        const response = await axios.post(API_URL + "register", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const updateUser = (updatedUser) => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
        storedUser.user = updatedUser;
        localStorage.setItem('user', JSON.stringify(storedUser));
    }
};

const AuthService = {
    login,
    logout,
    register,
    getCurrentUser,
    updateUser
};

export default AuthService;