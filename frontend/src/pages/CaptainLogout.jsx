import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainLogout = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            console.log("No token found, redirecting to login...");
            navigate("/captainLogin");
            return;
        }

        // Clear the token before making the request to avoid a second unauthorized request
        localStorage.removeItem("token");

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true, // Ensure cookies are sent
            })
            .then((response) => {
                console.log("Logout successful:", response.data);
                navigate("/capatinLogin");
            })
            .catch((error) => {
                console.error("Logout error:", error);
                navigate("/capatinLogin");
            });
    }, [navigate]);

  return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout