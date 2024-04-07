import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './new.css';
import 'firebase/storage';
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { storage } from '../firebase/firebase';
import { v4 } from "uuid";
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
} from 'firebase/storage';

function NewPost({ setOpenModal }) {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventTags, setEventTags] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [imageUrls, setImageUrls] = useState([]);

    const db = getFirestore();
    const imagesListRef = ref(storage, "images/");

    const saveDataToFirestore = async () => {
        await addDoc(collection(db, "newEvent"), {
            eventTitle,
            eventDescription,
            eventCategory,
            eventTags,
            imageUrl: imageUrls
        });

        console.log("Document written to Database");
    };

    const handlePublish = async () => {
        saveDataToFirestore();
        uploadFile();
        setOpenModal(false);
    };

    const uploadFile = async () => {
        if (mediaFile == null) return;
        const imageRef = ref(storage, `images/${mediaFile.name + v4()}`);
        uploadBytes(imageRef, mediaFile).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageUrls((prev) => [...prev, url]);
            });
        });
    };

    useEffect(() => {
        listAll(imagesListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImageUrls((prev) => [...prev, url]);
                });
            });
        });
    }, []);


    return (
        <div className="newPostmodalBackground">
            <div className="newPostmodalContainer">
                <div className="newPosttitleCloseBtn">
                    <button onClick={() => setOpenModal(false)}>X</button>
                </div>
                <div className="main-container">
                    <h1 className="head">Event Details</h1>
                    <div className="container-details">
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
                            onChange={(event) => {
                                setMediaFile(event.target.files[0]);
                            }}
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
                                <button className="submit-btn publish" type="submit" onClick={handlePublish}>Publish Event</button>
                                <button className="submit-btn draft">Save Draft</button>
                            </div>
                        </div>
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
