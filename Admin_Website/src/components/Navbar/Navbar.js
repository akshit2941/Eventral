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

    const handleReload = () => {
        window.location.reload();
    };

    useEffect(() => {
        // Check if user is already signed in
        const unsubscribe = auth.onAuthStateChanged(async (user) => {

            if (user) {
                const avatarUrl = user.photoURL;
                // console.log(avatarUrl);
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
                <Link to="#" className='navbar-elements'>Home</Link>
                <Link to="#" className='navbar-elements' onClick={handleReload}>Notifications</Link>
                <Link to="#" className='navbar-elements' onClick={handleReload}>Messages</Link>
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
