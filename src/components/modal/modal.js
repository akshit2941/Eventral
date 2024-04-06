import React from "react";
import PropTypes from 'prop-types';
import "./modal.css";
import avatar from '../../images/avatar.png';

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          {/* <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button> */}
        </div>

        {/* <div className="border-box"> */}
        <div className="profile-img">
          <img src={avatar} alt="profile_pic" />
        </div>

        <div className="profile-details">
          <div>
            <h3 className="head">Frank Ocean</h3>
            <p className="content">frankocean999@gmail.com</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-content">
            <h3 className="stat-head">943</h3>
            <p className="stat-para">Posts</p>
          </div>
          <div className="stat-content">
            <h3 className="stat-head">1257</h3>
            <p className="stat-para">Likes</p>
          </div>
          <div className="stat-content">
            <h3 className="stat-head">242K</h3>
            <p className="stat-para">Followers</p>
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
            <button className="profile-button-main">New Post</button>
            <button className="profile-button-main" id="crimson">Analytics</button>
          </div>
        </div>

        <div className="close">
          <button className="close-btn-main" onClick={() => setOpenModal(false)}>
            <img src="https://www.svgrepo.com/show/157873/close-button.svg" alt="close" className="close-button" />
          </button>
        </div>

        {/* </div> */}

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
