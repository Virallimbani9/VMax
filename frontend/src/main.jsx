import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {UserDataProvider}  from './context/UserContext.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserDataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter> 
    </UserDataProvider>
  </StrictMode>
)
