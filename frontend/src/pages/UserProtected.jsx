import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtected = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]); // ✅ Runs only when `token` changes

    return token ? <>{children}</> : null; // ✅ Prevent rendering before checking auth
};

export default UserProtected;
