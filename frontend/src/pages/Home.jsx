import React, { useEffect, useState } from "react";

const Home = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsKeyboardOpen(window.innerHeight < 600); // Adjust based on mobile screen height
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen w-screen flex flex-col items-center">
      {/* Logo */}
      <img
        src="/vmax.png"
        alt="VMax Logo"
        className="w-20 absolute left-5 top-5 z-10"
      />

      {/* Background Image with Overlay */}
      <div className="fixed inset-0">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Search Form */}
      <div
        className={`relative z-10 flex flex-col items-center ${
          isKeyboardOpen ? "mt-10" : "justify-center min-h-screen"
        } text-white w-full`}
      >
        <h4 className="text-3xl font-semibold mb-6">Find a Trip</h4>
        <form className="bg-white p-6 rounded-lg shadow-lg text-gray-900 w-80 space-y-4">
          <input
            type="text"
            placeholder="Where to pick-up?"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
          />
          <input
            type="text"
            placeholder="Enter your destination"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500"
          />
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black py-3 rounded-md hover:bg-yellow-600 transition duration-300"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
