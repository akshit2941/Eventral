import React, { useState, useEffect } from 'react'; // Import useState from React
import './Navbar.css';
import { Link } from "react-router-dom";
import Modal from '../modal/modal';
import { auth } from '../firebase/firebase';

// import defaultAvatar from '../../images/avatar.png';
import { doSignOut } from '../firebase/auth';

function Navbar() {
    const [modalOpen, setModalOpen] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        // Check if user is already signed in
        const unsubscribe = auth.onAuthStateChanged(async (user) => {

            if (user) {
                const avatarUrl = user.photoURL;
                console.log(avatarUrl);
                setAvatarUrl(avatarUrl);
            } else {
                console.log('No user logged in');
            }
        });

        return () => {
            unsubscribe(); // Cleanup function to unsubscribe from the auth state listener
        };
    }, []);

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
                <button className='user-btn openModalBtn' onClick={() => { setModalOpen(true); }}>
                    <img
                        src={avatarUrl}
                        alt="profile_pic"
                        className='user-pic'
                    />
                </button>
                {modalOpen && <Modal setOpenModal={setModalOpen} />}

            </nav>

        </header>

    )
}

export default Navbar;
