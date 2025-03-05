import React, { createContext, useState } from 'react';

// Create context
export const UserDataContext = createContext();

// Provider component
export const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <UserDataContext.Provider value={{ user, setUser }}>
            {children}
        </UserDataContext.Provider>
    );
};
