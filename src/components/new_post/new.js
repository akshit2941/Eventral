import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './new.css';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';


function NewPost({ setOpenModal }) {
    const [postTitle, setpostTitle] = useState('');
    const [postDescription, setpostDescription] = useState('');
    const [postCategory, setpostCategory] = useState('');
    const [postTags, setpostTags] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [userId, setUserId] = useState(null);

    // const [DropCategory, setDropCategory] = useState('');

    const [loading, setLoading] = useState(false);

    const postCategorySuggestions = ["comedy", "music", "speaker"];


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
            const postImageUrl = await getDownloadURL(snapshot.ref);

            const postObj = {
                postTitle,
                postDescription,
                postCategory,
                postTags,
                postImageUrl
            };

            const docRef = doc(db, "artists", userId);
            const docSnapshot = await getDoc(docRef);
            let existingPostData = {};

            if (docSnapshot.exists()) {
                existingPostData = docSnapshot.data();
            }

            // Merge existing posts with the new post
            const updatedPosts = [...(existingPostData.posts || []), postObj];

            await setDoc(docRef, {
                ...existingPostData, // Keep existing data
                posts: updatedPosts // Update only the posts field
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
        <div className="newPostmodalBackground">
            <div className="newPostmodalContainer">
                <div className="newPosttitleCloseBtn">
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
                    <h1 className="head">Post Details</h1>
                    <div className="container-details">
                        <h1 className="head-title">Post Title</h1>
                        <input
                            type="text"
                            className="event-tile-input-area"
                            placeholder="Event name"
                            value={postTitle}
                            onChange={(e) => setpostTitle(e.target.value)}
                        />

                        <h1 className="head-title head-margin">Post Description</h1>
                        <input
                            type="text"
                            className="event-tile-input-area"
                            placeholder="Add a brief desciption"
                            value={postDescription}
                            onChange={(e) => setpostDescription(e.target.value)}
                        />

                        <h1 className="head-title head-margin">Post Category</h1>
                        <input
                            type="text"
                            className="event-tile-input-area"
                            placeholder="Add Post Category"
                            value={postCategory}
                            onChange={(e) => setpostCategory(e.target.value)}
                            list="postCategorySuggestions"
                        />
                        <datalist id="postCategorySuggestions">
                            {postCategorySuggestions.map((suggestion, index) => (
                                <option key={index} value={suggestion} />
                            ))}
                        </datalist>

                        <h1 className="head-title head-margin">Post tags</h1>
                        <input
                            type="text"
                            className="event-tile-input-area"
                            placeholder="Enter Tags...."
                            value={postTags}
                            onChange={(e) => setpostTags(e.target.value)}
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
                                <h1 className="preview-head-main">Content Preview</h1>
                                <h1 className="preview-head">{postTitle}</h1>
                                {mediaFile && <img src={URL.createObjectURL(mediaFile)} alt="" className="preview-img" />}
                                <p className="media-des event-desciption">{postDescription}</p>
                            </div>
                        </div>

                        <div className="submit-container">
                            <div className="button-container">
                                <button className="submit-btn publish" type="submit" onClick={saveDataToFirestore}>Publish Post</button>
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