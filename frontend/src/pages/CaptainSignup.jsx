import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import axios from "axios";
import { UserDataContext } from "../context/UserContext";


const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    fullName: { firstName: "", lastName: "" },
    email: "",
    password: "",
    vehicle: { color: "", plate: "", capacity: "", vehicleType: "" },
  });
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserDataContext);


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
      fullName: `${formData.fullName.firstName} ${formData.fullName.lastName}`,
      email: formData.email,
      password: formData.password,
      vehicle: {
        color: formData.vehicle.color,
        plate: formData.vehicle.plate,
        capacity: parseInt(formData.vehicle.capacity),
        vehicleType: formData.vehicle.vehicleType,
      },
    };

    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`, formattedData);
      setUser(response.data.catain);
      navigate("/home");
    } catch (error) {
      console.error("Server Error:", error.response.data);
      alert(
        error.response.data.message ||
          "Error signing up! Please check your input."
      );
    }
  
      console.log("Captain Data:", formData);
      setFormData({
        fullName: { firstName: "", lastName: "" },
        email: "",
        password: "",
        vehicle: { color: "", plate: "", capacity: "", vehicleType: "" },
      });
    }
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-[url(https://plus.unsplash.com/premium_photo-1682048358624-8471ced24a65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] px-4">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-85 border border-gray-200">
        {/* VMax Logo */}
        <div className="flex justify-center mb-6">
          <img src="/vmax.png" alt="VMax Logo" className="h-20 drop-shadow-lg" />
        </div>

        {/* Form */} 
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={formData.fullName.firstName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={formData.fullName.lastName}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
          
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
           
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
           
          </div>

          {/* Vehicle Details */}
          <div>
            <h3 className="text-lg font-semibold mt-4 mb-1">Vehicle Information</h3>

            <label className="block text-sm font-medium text-gray-700">Vehicle Color</label>
            <input
              type="text"
              name="color"
              placeholder="Vehicle Color"
              value={formData.vehicle.color}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
           
            <label className="block text-sm font-medium text-gray-700 mt-2">Vehicle Plate</label>
            <input
              type="text"
              name="plate"
              placeholder="Vehicle Plate"
              value={formData.vehicle.plate}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
            

            <label className="block text-sm font-medium text-gray-700 mt-2">Vehicle Type</label>
            <select
              name="vehicleType"
              value={formData.vehicle.vehicleType}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Auto">Auto</option>
              <option value="MotorCycle">Motorcycle</option>
            </select>
           
            <label className="block text-sm font-medium text-gray-700 mt-2">Vehicle Capacity</label>
            <input
              type="number"
              name="capacity"
              placeholder="Vehicle Capacity"
              value={formData.vehicle.capacity}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CaptainSignup;
