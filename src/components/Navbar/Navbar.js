import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'


import avatar from '../../images/avatar.png';

function Navbar() {
    return (
        <header className="header">
            <div className="logo">Eventral</div>
            <nav className="navbar">
                <Link to="/" className='navbar-elements'>Home</Link>
                <Link to="/dashboard" className='navbar-elements'>Dashboard</Link>
                <Link to="/event" className='navbar-elements'>Events</Link>
                <Link to="/explore" className='navbar-elements'>Explore</Link>
                <Link to="/insight" className='navbar-elements'>Insights</Link>
                <div className='nav-btn'>
                    <button className='btn-new'>
                        New
                    </button>
                </div>
                <button className='user-btn'>
                    <img src={avatar} alt="profile_pic" className='user-pic' />
                </button>
            </nav>

        </header>
    )
}

export default Navbar