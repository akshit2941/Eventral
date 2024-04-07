import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './new.css';
import 'firebase/storage';
import { getFirestore, addDoc, collection } from "firebase/firestore";

function NewPost({ setOpenModal }) {
    // State to manage form input values
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventTags, setEventTags] = useState('');
    const [mediaFile, setMediaFile] = useState('');

    const db = getFirestore();




    const saveDataToFirestore = async () => {
        await addDoc(collection(db, "newEvent"), {
            eventTitle,
            eventDescription,
            eventCategory,
            eventTags,
        });

        console.log("Document written to Database");
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setMediaFile(file);
    };


    return (
        <div className="newPostmodalBackground">
            <div className="newPostmodalContainer">
                <div className="newPosttitleCloseBtn">
                    <button onClick={() => setOpenModal(false)}>X</button>
                </div>
                <div className="main-container">
                    <h1 className="head">Event Details</h1>
                    <div className="container-details">
                        <form>
                            <h1 className="head-title">Event Title</h1>
                            <input
                                type="text"
                                className="event-tile-input-area"
                                placeholder="Event name"
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)}
                            />

                            <h1 className="head-title head-margin">Event Description</h1>
                            <input
                                type="text"
                                className="event-tile-input-area"
                                placeholder="Add a brief desciption"
                                value={eventDescription}
                                onChange={(e) => setEventDescription(e.target.value)}
                            />

                            <h1 className="head-title head-margin">Event Category</h1>
                            <input
                                type="text"
                                className="event-tile-input-area"
                                placeholder="Add Event Category"
                                value={eventCategory}
                                onChange={(e) => setEventCategory(e.target.value)}
                            />

                            <h1 className="head-title head-margin">Event tags</h1>
                            <input
                                type="text"
                                className="event-tile-input-area"
                                placeholder="Enter Tags...."
                                value={eventTags}
                                onChange={(e) => setEventTags(e.target.value)}
                            />

                            <h1 className="head-title head-margin">Upload Media</h1>
                            <input
                                type="file"
                                className="media-select"
                                onChange={handleFileChange}
                            />

                            <div className="preview-container">
                                <div className="media-preview">
                                    <h1 className="preview-head-main">Event Preview</h1>
                                    <h1 className="preview-head">{eventTitle}</h1>
                                    {mediaFile && <img src={URL.createObjectURL(mediaFile)} alt="" className="preview-img" />}
                                    <p className="media-des event-desciption">{eventDescription}</p>
                                </div>
                            </div>

                            <div className="submit-container">
                                <div className="button-container">
                                    <button className="submit-btn publish" type="submit" onClick={saveDataToFirestore}>Publish Event</button>
                                    <button className="submit-btn draft">Save Draft</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

NewPost.propTypes = {
    setOpenModal: PropTypes.func.isRequired,
};

export default NewPost;
