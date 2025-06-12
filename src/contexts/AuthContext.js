// client/src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { register, login } from '../api/jobApi'; // Import API functions
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // To check initial token presence
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); // 
        if (token) {
            // In a real app, you'd verify the token with a backend call.
            // For simplicity, we'll assume a valid token means authenticated.
            // A more robust solution involves decoding or a /auth/me endpoint.
            setUser({ token }); // Store token as part of user state (can store decoded user info too)
        }
        setLoading(false);
    }, []);

    const registerUser = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await register({ email, password });
            localStorage.setItem('token', res.data.token); // 
            setUser(res.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const res = await login({ email, password });
            localStorage.setItem('token', res.data.token); // 
            setUser(res.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('token'); // 
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, registerUser, loginUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);