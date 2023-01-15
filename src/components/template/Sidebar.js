import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className='nav flex-column nav-list-sidebar'>
                <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
                <NavLink to="/userdetails" className="nav-item">User Details</NavLink>
                <NavLink to="/store" className="nav-item">Store</NavLink>
                <NavLink to="/service" className="nav-item">Service</NavLink>
                <NavLink to="/contactus" className="nav-item">Contact Us</NavLink>
            </div>
            <div className="nav flex-column nav-logout">
                <NavLink to="/" className="nav-item">Logout</NavLink>
            </div>
        </>
    );
}

export default Sidebar