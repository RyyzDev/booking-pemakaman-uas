import React, { useState } from 'react';
import axios from '../config/axios';

const LoginForm = ({ setView, setIsAdmin, isLoggingIn, setIsLoggingIn, setNotification, showNotification }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setNotification(null);
        setIsLoggingIn(true);

        try {
            const response = await axios.post('/api/login', {
                email: formData.email,
                password: formData.password
            });
            
            const { token, user } = response.data;
            
            // Validasi response
            if (!token || !user || !user.id) {
                throw new Error('Response login tidak valid');
            }

            localStorage.setItem('authToken', token);

            localStorage.setItem('userData', JSON.stringify(user));
            
            //  Set token ke axios headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            
            setIsAdmin(true);
            
            //  Redirect ke admin
            setView('admin');
            
            showNotification(`Selamat Datang, ${user.name}! 👋`, 'success');

        } catch (error) {
            console.error('Login error:', error);
            
            // jika gagal
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            delete axios.defaults.headers.common['Authorization'];
            
            const errorMsg = error.response?.data?.message || "Login Gagal, Periksa Email atau Password!";
            showNotification(errorMsg, 'error');
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-8 mt-10 bg-white shadow-xl rounded-xl">
            <h2 className="text-3xl font-bold text-center text-emerald-800 mb-6">🔒 Admin Login</h2>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="email">Email</label>
                    <input 
                        id="email"
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" 
                        required 
                        autoComplete="email"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1" htmlFor="password">Password</label>
                    <input
                        id="password"
                        name="password" 
                        type="password" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                        className="w-full p-3 border border-stone-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500" 
                        required 
                        autoComplete="current-password"
                    />
                </div>
                <button 
                    onClick={handleSubmitLogin}
                    className="w-full bg-emerald-800 text-white py-3 rounded-lg hover:bg-emerald-700 transition font-semibold disabled:bg-stone-400 disabled:cursor-not-allowed" 
                    disabled={isLoggingIn}
                >
                    {isLoggingIn ? 'Memverifikasi...' : 'Masuk ke Admin Panel'}
                </button>
            </div>
            <div className="text-center mt-4">
                <button onClick={() => setView('home')} className="text-sm text-stone-500 hover:text-emerald-800 transition">
                    ← Kembali ke Halaman Utama
                </button>
            </div>
        </div>
    );
};

export default LoginForm