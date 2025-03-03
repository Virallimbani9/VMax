import React from 'react';

const UserLogin = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-[url(https://plus.unsplash.com/premium_photo-1682834983265-27a10ba5232c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)]">
            {/* Login Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg w-85 border border-gray-200">
                
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/vmax.png" alt="VMax Logo" className="h-20 drop-shadow-lg" />
                </div>

                {/* Login Form */}
                <form className="space-y-6">
                    
                    {/* Email Input */}
                    <div>
                        <label className="block text-gray-700 font-medium text-sm tracking-wide">
                            What's Your Email
                        </label>
                        <input 
                            required 
                            type="email" 
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

                    {/* Sign-Up Link */}
                    <p className="mt-4 text-center text-gray-600 text-sm">
                        New here? 
                        <a href="/signup" className="text-blue-600 hover:underline ml-1">
                            Create Your Account
                        </a>
                    </p>
                </form>

                {/* Sign In as Captain Button */}
                <button 
                    type="button"
                    onClick={() => window.location.href='/captainLogin'}
                    className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg 
                    hover:bg-green-600 transition-all duration-300 transform hover:scale-105 shadow-md font-bold">
                    Login as Captain
                </button>

            </div>
        </div>
    );
}

export default UserLogin;
