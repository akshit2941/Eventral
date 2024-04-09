import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "./modal.css";
import { Link } from "react-router-dom";
// import avatar from '../../images/avatar.png';

import { auth } from '../firebase/firebase';

function Modal({ setOpenModal }) {
  // const [modalOpen, setModalOpen] = useState(false);
  // const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Check if user is already signed in
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const avatarUrl = user.photoURL;
        const displayName = user.displayName;
        const email = user.email;

        console.log(avatarUrl);
        console.log(displayName);
        console.log(email);

        setAvatarUrl(avatarUrl);
        setDisplayName(displayName);
        setEmail(email);
      } else {
        console.log('No user logged in');
      }
    });

    return () => {
      unsubscribe(); // Cleanup function to unsubscribe from the auth state listener
    };
  }, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
        </div>

        <div className="profile-img">
          <img src={avatarUrl || 'default_avatar.jpg'} alt="profile_pic" />
        </div>

        <div className="profile-details">
          <div>
            <h3 className="head">{displayName || 'Guest'}</h3>
            <p className="content">{email || 'guest@example.com'}</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-content-modal">
            <h3 className="stat-head-modal">943</h3>
            <p className="stat-para-modal">Posts</p>
          </div>
          <div className="stat-content-modal">
            <h3 className="stat-head-modal">1257</h3>
            <p className="stat-para-modal">Likes</p>
          </div>
          <div className="stat-content-modal">
            <h3 className="stat-head-modal">242K</h3>
            <p className="stat-para-modal">Followers</p>
          </div>
        </div>

        <div className="profile-about">
          <p className="about-para">
            As Frank Ocean, I craft music that transcends boundaries, blending R&B with introspection. My soulful voice and storytelling delve into the complexities of identity and emotion, resonating with listeners worldwide.
          </p>
        </div>

        <div className="profile-genre">
          <div className="genre">
            <p>Pop</p>
          </div>
          <div className="genre">
            <p>Rap</p>
          </div>
          <div className="genre">
            <p>Country Music</p>
          </div>
          <div className="genre">
            <p>Real</p>
          </div>
        </div>

        <div className="profile-navigator">
          <div className="profile-buttons">
            <Link to="/event">
              <button className="profile-button-main" id="grey">New Post</button>
            </Link>
            <Link to="/insight">
              <button className="profile-button-main" id="crimson">Analytics</button>
            </Link>
          </div>
        </div>

        <div className="close">
          <button className="close-btn-main" onClick={() => setOpenModal(false)}>
            <img src="https://www.svgrepo.com/show/157873/close-button.svg" alt="close" className="close-button" />
          </button>
        </div>
        <div className="footer">
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  setOpenModal: PropTypes.func.isRequired
};

export default Modal;
