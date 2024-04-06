import React, { useState } from 'react'; // Import useState from React
import './Navbar.css';
import { Link } from "react-router-dom";
import Modal from '../modal/modal';

import avatar from '../../images/avatar.png';
import { doSignOut } from '../firebase/auth';

function Navbar() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <header className="header">

            <div className="logo">Eventral</div>
            <nav className="navbar">
                <Link to="/home_web" className='navbar-elements'>Home</Link>
                <Link to="/dashboard" className='navbar-elements'>Dashboard</Link>
                <Link to="/event" className='navbar-elements'>Events</Link>
                <Link to="/explore" className='navbar-elements'>Explore</Link>
                <Link to="/insight" className='navbar-elements'>Insights</Link>
                <div className='nav-btn'>
                    <button className='btn-new' onClick={doSignOut}>
                        Logout
                    </button>
                </div>
                <button className='user-btn openModalBtn'
                    onClick={() => {
                        setModalOpen(true);
                    }}>
                    <img src={avatar} alt="profile_pic" className='user-pic'/>
                </button>
                {modalOpen && <Modal setOpenModal={setModalOpen} />}

            </nav>

        </header>

    )
}

export default Navbar;
