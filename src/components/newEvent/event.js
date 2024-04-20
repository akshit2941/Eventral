import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './event.css';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';


function NewPost({ setOpenModal }) {
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventPrice, setEventPrice] = useState(0);
    const [eventDate, setEventDate] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [userId, setUserId] = useState(null);

    const [loading, setLoading] = useState(false);

    const db = getFirestore();
    const storage = getStorage();
    const auth = getAuth();

    useEffect(() => {
        setLoading(true)    
        setTimeout(() => {
            setLoading(false)
        }, 1000);

        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setMediaFile(e.target.files[0]);
        }
    };

    const saveDataToFirestore = async () => {
        try {
            setLoading(true);
            if (mediaFile == null) throw new Error("Please select an image");

            const imageRef = ref(storage, `images/${mediaFile.name}-${uuidv4()}`);
            const snapshot = await uploadBytes(imageRef, mediaFile);
            const eventImageUrl = await getDownloadURL(snapshot.ref);

            const parsedEventPrice = parseInt(eventPrice);

            const eventObj = {
                eventTitle,
                eventDescription,
                eventPrice: parsedEventPrice,
                eventDate,
                eventImageUrl

            };

            const docRef = doc(db, "artists", userId);
            const docSnapshot = await getDoc(docRef);
            let existingEventData = {};

            if (docSnapshot.exists()) {
                existingEventData = docSnapshot.data();
            }

            const updatedEvents = [...(existingEventData.events || []), eventObj];

            await setDoc(docRef, {
                ...existingEventData, 
                events: updatedEvents
            });

            setOpenModal(false);

            console.log("Document written to Database");
        } catch (error) {
            console.error("Error saving data to Firestore:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="newEventmodalBackground">
            <div className="newEventmodalContainer">
                <div className="newEventtitleCloseBtn">
                    <button onClick={() => setOpenModal(false)}>X</button>
                </div>
                {loading ? (
                    <div style={{
                        backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: '100vh'
                    }}>
                        <ClimbingBoxLoader
                            size={30}
                            color={'#000000'}
                            loading={loading}
                            className="loading-spinner"
                        />
                    </div>
                ) : null}
                <div className="main-container" style={{ display: loading ? 'none' : 'block' }}>
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

                        <h1 className="head-title head-margin">Ticket Price</h1>
                        <input
                            type="number"
                            className="event-tile-input-area"
                            placeholder="Enter Ticket Price"
                            value={eventPrice}
                            onChange={(e) => setEventPrice(parseInt(e.target.value))}
                        />

                        <h1 className="head-title head-margin">Event Date</h1>
                        <input
                            type="date"
                            className="event-tile-input-area"
                            placeholder="Enter Date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
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