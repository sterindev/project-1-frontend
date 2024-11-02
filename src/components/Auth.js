import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = ({ isLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { register, login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            await login(username, password);
        } else {
            await register(username, password);
        }
        navigate('/dashboard');
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-lg font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
        </div>
    );
};

export default Auth;
