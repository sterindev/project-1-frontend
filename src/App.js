import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Auth isLogin={false} />} />
                    <Route path="/login" element={<Auth isLogin={true} />} />
                    <Route path="/register" element={<Auth isLogin={false} />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;