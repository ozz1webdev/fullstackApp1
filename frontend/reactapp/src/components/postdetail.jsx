import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const PostDetail = ({ postId }) => {
    const [show, setShow] = useState(false);
    const [postDetails, setPostDetails] = useState(null);

    // Function to handle showing and hiding the modal
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Fetch post details when modal is opened
    useEffect(() => {
        if (show) {
            fetchPostDetails(postId);
        }
    }, [show, postId]);

    // Function to fetch post details from the backend
    const fetchPostDetails = async (postId) => {
        try {
            const response = await axios.get(`/posts/${postId}/`, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            setPostDetails(response.data);
        } catch (error) {
            console.error("Error fetching post details:", error);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Post Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Display post details if available */}
                    {postDetails ? (
                        <div>
                            <h3>{postDetails.title}</h3>
                            <p>{postDetails.content}</p>
                            {postDetails.image && (
                                <img src={postDetails.image} alt="Post" style={{ maxWidth: '100%' }} />
                            )}
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PostDetail;