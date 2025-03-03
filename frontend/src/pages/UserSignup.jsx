import React, { useState } from 'react';

const UserSignup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        if (formData.firstName.length < 3 || formData.firstName.length > 50) {
            newErrors.firstName = "First name must be between 3 and 50 characters.";
        }
        if (formData.lastName.length < 3 || formData.lastName.length > 50) {
            newErrors.lastName = "Last name must be between 3 and 50 characters.";
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (formData.password.length < 8 || formData.password.length > 100) {
            newErrors.password = "Password must be between 8 and 100 characters.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("User Data:", formData);
            setFormData({ firstName: '', lastName: '', email: '', password: '' });
            setErrors({});
        }
    };

    return (
        <div 
            className="flex justify-center items-center min-h-screen bg-cover bg-center bg-no-repeat px-4" 
            style={{ backgroundImage: "url(https://plus.unsplash.com/premium_photo-1682048358624-8471ced24a65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)" }} // Change this image URL as needed
        >
            {/* Signup Card */}
            <div className="bg-white bg-opacity-90 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-300">
                
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <img src="/vmax.png" alt="VMax Logo" className="h-16 md:h-20" />
                </div>

                {/* Signup Form */}
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    
                    {/* First Name */}
                    <div>
                        <label className="block text-gray-700 font-medium text-sm">First Name</label>
                        <input 
                            required 
                            type="text" 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="John"
                            className="w-full px-4 py-3 mt-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 transition-all duration-300"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-gray-700 font-medium text-sm">Last Name</label>
                        <input 
                            required 
                            type="text" 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Doe"
                            className="w-full px-4 py-3 mt-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 transition-all duration-300"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium text-sm">Email</label>
                        <input 
                            required 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@gmail.com" 
                            className="w-full px-4 py-3 mt-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 transition-all duration-300"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-700 font-medium text-sm">Password</label>
                        <input 
                            required 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter Password" 
                            className="w-full px-4 py-3 mt-2 bg-gray-100 text-gray-900 border border-gray-300 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 transition-all duration-300"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    {/* Signup Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-yellow-500  text-white py-3 rounded-lg 
                        hover:bg-blue-600 transition-all duration-300 transform shadow-md font-semibold">
                        Sign Up
                    </button>

                    {/* Already have an account? */}
                    <p className="mt-4 text-center text-gray-600 text-sm">
                        Already have an account? 
                        <a href="/login" className="text-blue-600 hover:underline ml-1">
                            Login here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UserSignup;
