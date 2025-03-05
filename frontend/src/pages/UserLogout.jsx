import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
    const navigate = useNavigate();
    let token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            console.log("No token found, redirecting to login...");
            navigate("/login");
            return;
        }

        // Clear the token before making the request to avoid a second unauthorized request
        localStorage.removeItem("token");

        axios
            .get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true, // Ensure cookies are sent
            })
            .then((response) => {
                console.log("Logout successful:", response.data);
                navigate("/login");
            })
            .catch((error) => {
                console.error("Logout error:", error);
                navigate("/login");
            });
    }, [navigate]);

    return <div>Logging out...</div>;
};

export default UserLogout;
