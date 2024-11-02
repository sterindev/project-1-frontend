import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (username, password) => {
        const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
        setUser(response.data);
    };

    const login = async (username, password) => {
        const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
        setUser(response.data);
        localStorage.setItem('token', response.data.token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const isAuthenticated = () => !!user;

    return (
        <AuthContext.Provider value={{ user, register, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
