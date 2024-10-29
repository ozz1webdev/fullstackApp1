import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../assets/css/posts.module.css';
import TextEditor from '../components/TextEditor';
import CreatePost from '../components/CreatePost';
import EditPost from '../components/EditPost';
import { Modal, Button } from 'react-bootstrap';


const API_URL = '/posts/';
const API_URL_CREATE = '/create/';
const API_URL_UPDATE = '/update/';
const API_URL_DELETE = '/delete/';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '', image: '' });
    const [editingPost, setEditingPost] = useState(null);
    const [modalisOpen, setModalIsOpen] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const[postIdToEdit, setPostIdToEdit] = useState(null);

    const handleEditClose = () => {
        setShowEditModal(false);
        setPostIdToEdit(null);
      };
      
      const handleEditShow = (postId) => {
        setPostIdToEdit(postId);
        setShowEditModal(true);
      };


    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
    };

    // Fetch posts from the API
    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(API_URL);
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Create a new post
    const createPost = async () => {
        try {
            const response = await axios.post(API_URL_CREATE, newPost, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            });
            setPosts([...posts, response.data]);
            setNewPost({ title: '', content: '', image: '' });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    // Update an existing post
    const updatePost = async (postId) => {
        try {
            const response = await axios.put(`${API_URL_UPDATE}${postId}/`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            }, editingPost);
            setPosts(posts.map((post) => (post.id === postId ? response.data : post)));
            setEditingPost(null);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    // Delete a post
    const deletePost = async (postId) => {
        try {
            await axios.delete(`${API_URL_DELETE}${postId}/`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            });
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div>
            <h1>Posts</h1>

            <div>
                <Button variant="primary" onClick={openModal}>Create Post</Button>
                
                <Modal show={modalisOpen} onHide={closeModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <CreatePost />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                <Modal show={showEditModal} onHide={handleEditClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {postIdToEdit && <EditPost postId={postIdToEdit} onClose={handleEditClose} />}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleEditClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div>
                <h2>All Posts</h2>
                    <>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <img className={styles.postImage} src={post.image} alt={post.title} />
                        <p>{post.created_at}</p>
                        <Button variant="link" onClick={() => handleEditShow(1)}>Edit</Button>
                        <button onClick={() => setEditingPost(post)}>Edit</button>
                        <button onClick={() => deletePost(post.id)}>Delete</button>
                    </>
            </div>
        </div>
    );
}

export default Posts;