import React from 'react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { logout, user } = useAuth();

    return (
        <header className="bg-blue-600 p-4 text-white flex justify-between">
            <h1 className="text-xl">Health & Wellness App</h1>
            <nav>
                {user ? (
                    <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
                ) : (
                    <div>
                        <a href="/register" className="px-4">Register</a>
                        <a href="/login" className="px-4">Login</a>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
