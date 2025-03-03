import React, { useState } from "react";

const CaptainSignup = () => {
  const [formData, setFormData] = useState({
    fullName: { firstName: "", lastName: "" },
    email: "",
    password: "",
    vehicle: { color: "", plate: "", capacity: "", vehicleType: "" },
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    // First Name Validation
    if (formData.fullName.firstName.length < 3 || formData.fullName.firstName.length > 50) {
      newErrors.firstName = "First name must be between 3 and 50 characters.";
    }

    // Last Name Validation
    if (formData.fullName.lastName.length < 3 || formData.fullName.lastName.length > 50) {
      newErrors.lastName = "Last name must be between 3 and 50 characters.";
    }

    // Email Validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Password Validation
    if (formData.password.length < 8 || formData.password.length > 100) {
      newErrors.password = "Password must be between 8 and 100 characters.";
    }

    // Vehicle Details Validation
    if (!formData.vehicle.color) newErrors.color = "Vehicle color is required.";
    if (!formData.vehicle.plate) newErrors.plate = "Vehicle plate is required.";
    if (!formData.vehicle.capacity || formData.vehicle.capacity < 1 || formData.vehicle.capacity > 20) {
      newErrors.capacity = "Capacity must be between 1 and 20.";
    }
    if (!formData.vehicle.vehicleType) newErrors.vehicleType = "Vehicle type is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Captain Data:", formData);
      setFormData({
        fullName: { firstName: "", lastName: "" },
        email: "",
        password: "",
        vehicle: { color: "", plate: "", capacity: "", vehicleType: "" },
      });
      setErrors({});
    }
  };

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
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
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
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
            {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-2">Vehicle Plate</label>
            <input
              type="text"
              name="plate"
              placeholder="Vehicle Plate"
              value={formData.vehicle.plate}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
            {errors.plate && <p className="text-red-500 text-sm">{errors.plate}</p>}

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
            {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType}</p>}

            <label className="block text-sm font-medium text-gray-700 mt-2">Vehicle Capacity</label>
            <input
              type="number"
              name="capacity"
              placeholder="Vehicle Capacity"
              value={formData.vehicle.capacity}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:ring focus:ring-blue-300"
            />
            {errors.capacity && <p className="text-red-500 text-sm">{errors.capacity}</p>}
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
