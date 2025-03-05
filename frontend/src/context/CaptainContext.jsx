import React, { createContext, useState , useContext } from 'react';

// Create context
export const CaptainDataContext = createContext();

export const useCaptain = () => {
    return useContext(CaptainDataContext);
}

export const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
}
