import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const SecureHome = ({ children }) => {
    
    const [jwt, setJwt] = useState(localStorage.getItem('isAuthenticated'));
    return jwt != 'null' ? children : <Navigate to="/apps" />
}

export default SecureHome