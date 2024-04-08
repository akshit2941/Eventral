import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './new.css';
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";


function NewPost({ setOpenModal }) {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventTags, setEventTags] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [userId, setUserId] = useState(null);

    const db = getFirestore();
    const storage = getStorage();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            // User is signed in.
            setUserId(user.uid);
          } else {
            // No user is signed in.
            setUserId(null);
          }
        });
    
        // Clean up subscription to avoid memory leaks
        return () => unsubscribe();
      }, []);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setMediaFile(e.target.files[0]);
        }
    };

    const saveDataToFirestore = async () => {
        try {
            if (mediaFile == null) throw new Error("Please select an image");

            const imageRef = ref(storage, `images/${mediaFile.name + uuidv4()}`);
            const snapshot = await uploadBytes(imageRef, mediaFile);
            const imageUrl = await getDownloadURL(snapshot.ref);

            await addDoc(collection(db, `/artists/${userId}/`), {
                eventTitle,
                eventDescription,
                eventCategory,
                eventTags,
                imageUrl
            });

            console.log("Document written to Database");
            setOpenModal(false);
        } catch (error) {
            console.error("Error saving data to Firestore:", error.message);
        }
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
                                handleFileChange;
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
                                <button className="submit-btn publish" type="submit" onClick={saveDataToFirestore}>Publish Event</button>
                                <button className="submit-btn draft" type='submit'>Upload Image</button>
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
