import React, { useState } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { user, setUser } = React.useContext(UserDataContext);
  
    if (!setUser) {
      console.error(
        "setUser is not defined. Ensure UserContext is wrapping the component."
      );
    }


    
    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        }
        // console.log(userData);

        try{
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`, userData);
            setUser(res.data);
            localStorage.setItem('token', res.data.token);
            navigate('/home');
        } catch (error) {
            console.error(error.response.data.message);
        }
        setEmail('');
        setPassword('');
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-[url(https://plus.unsplash.com/premium_photo-1682834983265-27a10ba5232c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)]">
            {/* Login Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-85 border border-gray-200">
                
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/vmax.png" alt="VMax Logo" className="h-20 drop-shadow-lg" />
                </div>

                {/* Login Form */}
                <form className="space-y-6" onSubmit={(e) => submitHandler(e)}>
                    
                    {/* Email Input */}
                    <div>
                        <label className="block text-gray-700 font-medium text-sm tracking-wide">
                            What's Your Email
                        </label>
                        <input 
                            required 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@gmail.com" 
                            className="w-full px-4 py-3 mt-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 transition-all duration-300"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-gray-700 font-medium text-sm tracking-wide">
                            What's Your Password
                        </label>
                        <input 
                            required 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Password" 
                            className="w-full px-4 py-3 mt-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 transition-all duration-300"
                        />
                    </div>

                    {/* Login Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-yellow-500 text-white py-3 rounded-lg 
                        hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-md">
                        Login
                    </button>

                </form>

                {/* Sign-Up Link */}
                <p className="mt-3 text-center text-gray-600 text-sm">
                        New here? 
                        <a href="/signup" className="text-blue-600 hover:underline ml-1">
                            Create Your Account
                        </a>
                </p>

                {/* Sign In as Captain Button */}
                <button 
                    type="button"
                    onClick={() => window.location.href='/captainLogin'}
                    className="w-full mt-10 bg-green-500 text-white py-3 rounded-lg 
                    hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md font-bold">
                    Login as Captain
                </button>

            </div>
        </div>
    );
}

export default UserLogin;
