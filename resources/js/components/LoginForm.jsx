import React, { useState } from 'react';
import axios from '../config/axios';

const LoginForm = ({ setView, setIsAdmin, isLoggingIn, setIsLoggingIn, setNotification }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });



    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setNotification(null);

        try {
            const response = await axios.post('/api/login', {
                email: formData.email,
                password: formData.password
            });
            const token = response.data.token; 
            localStorage.setItem('authToken', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsAdmin(true);
            setView('admin');
            setNotification({ type: 'success', message: response.data.message });

        } catch (error) {
            console.error("Login gagal:", error);
            const errorMessage = error.response?.data?.errors?.email?.[0] || 
                                 error.response?.data?.message || 
                                 "Gagal melakukan login. Mohon periksa kredensial Anda.";
            setNotification({ type: 'error', message: errorMessage });
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 mt-10 bg-white shadow-xl rounded-xl">
            <h2 className="text-3xl font-bold text-center text-emerald-800 mb-6">🔑 Admin Login</h2>
            <form onSubmit={handleSubmitLogin} className="space-y-6">
                <div>
                    <legend className="block text-sm font-medium text-stone-700 mb-1" htmlFor="email">Email</legend>
                    <input 
                        id="email"
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" 
                        required 
                    />
                </div>
                <div>
                    <legend className="block text-sm font-medium text-stone-700 mb-1" htmlFor="password">Password</legend>
                    <input
                        id="password"
                        name="password" 
                        type="password" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" 
                        required 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-emerald-800 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-semibold" 
                    disabled={isLoggingIn}
                >
                    {isLoggingIn ? 'Masuk...' : 'Masuk ke Admin Panel'}
                </button>
            </form>
            <div className="text-center mt-4">
                <button onClick={() => setView('home')} className="text-sm text-stone-500 hover:text-emerald-800 transition">
                    ← Kembali ke Halaman Utama
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
