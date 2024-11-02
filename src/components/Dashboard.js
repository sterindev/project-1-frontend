import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Dashboard = () => {
    const { user } = useAuth();
    const [exercises, setExercises] = useState([]);
    const [foods, setFoods] = useState([]);
    const [exerciseType, setExerciseType] = useState('');
    const [exerciseDuration, setExerciseDuration] = useState(0);
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [foodName, setFoodName] = useState('');
    const [foodCalories, setFoodCalories] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { 'x-auth-token': token } };
            const exerciseResponse = await axios.get('http://localhost:5000/api/exercises', config);
            const foodResponse = await axios.get('http://localhost:5000/api/foods', config);
            setExercises(exerciseResponse.data);
            setFoods(foodResponse.data);
        };
        fetchData();
    }, []);

    const logExercise = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/exercises', { type: exerciseType, duration: exerciseDuration, caloriesBurned }, {
            headers: { 'x-auth-token': token }
        });
        setExercises([...exercises, { type: exerciseType, duration: exerciseDuration, caloriesBurned }]);
        setExerciseType('');
        setExerciseDuration(0);
        setCaloriesBurned(0);
    };

    const logFood = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/api/foods', { name: foodName, calories: foodCalories }, {
            headers: { 'x-auth-token': token }
        });
        setFoods([...foods, { name: foodName, calories: foodCalories }]);
        setFoodName('');
        setFoodCalories(0);
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Welcome, {user.username}</h2>

            {/* Log Exercise Section */}
            <h3 className="text-xl font-semibold mb-2">Log Exercise</h3>
            <form onSubmit={logExercise} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input 
                        type="text" 
                        placeholder="Exercise Type" 
                        value={exerciseType} 
                        onChange={(e) => setExerciseType(e.target.value)} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="number" 
                        placeholder="Duration (min)" 
                        value={exerciseDuration} 
                        onChange={(e) => setExerciseDuration(e.target.value)} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="number" 
                        placeholder="Calories Burned" 
                        value={caloriesBurned} 
                        onChange={(e) => setCaloriesBurned(e.target.value)} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Log Exercise
                </button>
            </form>

            {/* Log Food Section */}
            <h3 className="text-xl font-semibold mb-2">Log Food</h3>
            <form onSubmit={logFood} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <input 
                        type="text" 
                        placeholder="Food Name" 
                        value={foodName} 
                        onChange={(e) => setFoodName(e.target.value)} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="number" 
                        placeholder="Calories" 
                        value={foodCalories} 
                        onChange={(e) => setFoodCalories(e.target.value)} 
                        required 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Log Food
                </button>
            </form>

            {/* Display Logged Exercises */}
            <h3 className="text-xl font-semibold mb-2">Logged Exercises</h3>
            <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {exercises.map((exercise, index) => (
                    <li key={index} className="border-b py-2">{`${exercise.type} - ${exercise.duration} min - ${exercise.caloriesBurned} calories`}</li>
                ))}
            </ul>

            {/* Display Logged Foods */}
            <h3 className="text-xl font-semibold mb-2">Logged Foods</h3>
            <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {foods.map((food, index) => (
                    <li key={index} className="border-b py-2">{`${food.name} - ${food.calories} calories`}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
