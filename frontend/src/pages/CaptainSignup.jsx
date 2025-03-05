import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    fullName: { firstName: "", lastName: "" },
    email: "",
    password: "",
    vehicle: { color: "", plate: "", capacity: "", vehicleType: "" },
  });
  const navigate = useNavigate();
  const { captain, setCaptain } = React.useContext(CaptainDataContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["firstName", "lastName"].includes(name)) {
      setFormData({ ...formData, fullName: { ...formData.fullName, [name]: value } });
    } else if (name in formData.vehicle) {
      setFormData({ ...formData, vehicle: { ...formData.vehicle, [name]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      fullName: {
        firstName: formData.fullName.firstName,
        lastName: formData.fullName.lastName,
      },
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.vehicle.color,
        plate: formData.vehicle.plate,
        capacity: parseInt(formData.vehicle.capacity),
        vehicleType: formData.vehicle.vehicleType,
      },
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, formattedData);
      setCaptain(response.data.captain);
      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      console.error("Server Error:", error.response.data);
      alert(error.response.data.message || "Error signing up! Please check your input.");
    }

    setFormData({
      fullName: { firstName: "", lastName: "" },
      email: "",
      password: "",
      vehicle: { color: "", plate: "", capacity: "", vehicleType: "" },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-[url(https://plus.unsplash.com/premium_photo-1682048358624-8471ced24a65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)]">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        {/* Uber Logo */}
        <div className="flex justify-start mb-4">
        <img src="/vmax.png" alt="VMax Logo" className="h-20 drop-shadow-lg" />
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First & Last Name */}
          <div className="flex space-x-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.fullName.firstName}
              onChange={handleChange}
              className="w-1/2 bg-gray-100 px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.fullName.lastName}
              onChange={handleChange}
              className="w-1/2 bg-gray-100 px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-gray-100 px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-gray-100 px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
          />

          {/* Vehicle Information */}
          <h3 className="text-lg font-semibold mt-2">Vehicle Information</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              name="color"
              placeholder="Color"
              value={formData.vehicle.color}
              onChange={handleChange}
              className="w-1/2 bg-gray-100 px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="plate"
              placeholder="Plate Number"
              value={formData.vehicle.plate}
              onChange={handleChange}
              className="w-1/2 bg-gray-100 px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
            />
          </div>

          <div className="flex space-x-2">
            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              value={formData.vehicle.capacity}
              onChange={handleChange}
              className="w-1/2 bg-gray-100 px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
            />
            <select
              name="vehicleType"
              value={formData.vehicle.vehicleType}
              onChange={handleChange}
              className="w-1/2 bg-gray-100 px-4 py-2 rounded-md focus:ring focus:ring-gray-300"
            >
              <option value="">Type</option>
              <option value="Car">Car</option>
              <option value="Auto">Auto</option>
              <option value="MotorCycle">Motorcycle</option>
            </select>
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-yellow-500 text-black py-2 rounded-md hover:bg-gray-900">
            Create Captain Account
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-500 text-sm mt-2">
            Already have an account? <a href="/captainLogin" className="text-blue-600">Login here</a>
          </p>

          {/* reCAPTCHA Notice */}
          <p className="text-xs text-gray-400 text-center mt-4">
            This site is protected by reCAPTCHA and the Google <a href="#" className="text-blue-600">Privacy Policy</a> and <a href="#" className="text-blue-600">Terms of Service</a> apply.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;
