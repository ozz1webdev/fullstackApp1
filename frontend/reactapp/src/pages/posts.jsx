import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../assets/css/posts.module.css';
import CreatePost from '../components/CreatePost';
import EditPost from '../components/EditPost';
import DateConvert from '../components/dateConvert';
import { Modal, Button } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const API_URL = '/posts/';
const API_URL_DELETE = '/delete/';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [postDetails, setPostDetails] = useState([]);
    const [modalisOpen, setModalIsOpen] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const[postIdToEdit, setPostIdToEdit] = useState(null);
    const[postIdToDetail, setPostIdToDetail] = useState(null);
    const [userRole, setUserRole] = useState(null);    
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token'));

    const handleDetailClose = () => {
        setShowDetailModal(false);
      };
      
      const handleDetailShow = (postId) => {
        setPostIdToDetail(postId);
        setPostIdToDetail(postId);
        setShowDetailModal(true);
      };

    const handleEditClose = () => {
        setShowEditModal(false);
        setPostIdToEdit(null);
        setPostIdToDetail(null);
      };
      
      const handleEditShow = (postId) => {
        setPostIdToEdit(postId);
        setPostIdToDetail(postId);
        setShowEditModal(true);
      };


    const openModal = () => {
      setModalIsOpen(true);
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      setUserRole('admin');
    };
    // Fetch posts from the API
    useEffect(() => {
        fetchPosts();
        setToken(localStorage.getItem('token'));
    }, []);

    useEffect(() => {
        if (showDetailModal) {
            fetchPostDetails(postIdToDetail);
            fetchComments(postIdToDetail);
        }
    }, [showDetailModal, postIdToDetail]);


    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        axios.get('/profile/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${storedToken}`
            }
        }).then(response => {
            setUserRole(response.data.role);
        })
        .catch(error => {
            console.error('Error fetching user role:', error);
        });
    
      },[]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get(API_URL);
            setPosts(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    const fetchPostDetails = async (postIdToDetail) => {
        try {
            const response = await axios.get(`/posts/${postIdToDetail}/`, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            setPostDetails(response.data);
        } catch (error) {
            console.error("Error fetching post details:", error);
        }
    };

    const fetchComments = async (postIdToDetail) => {
        try {
            const response = await axios.get(`/comments/${postIdToDetail}/`, {
                headers: { Authorization: `Token ${localStorage.getItem('token')}` },
            });
            setComments(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching post details:", error);
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

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
            const response = await axios.post(`/comments/create/${postIdToDetail}/`, { content: newComment }, {
                headers: { 'Authorization': `Token ${localStorage.getItem('token')}` }
            });
            setComments([...comments, response.data]);
            setNewComment("");
        } catch (err) {
            console.error("Error adding comment");
        }
    };

    const modules = {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['bold', 'italic', 'underline', 'strike'],
          ['link', 'image'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
        ],
      };

      const formats = [
        'header',
        'font',
        'list',
        'bold',
        'italic',
        'underline',
        'strike',
        'align',
        'color',
        'background',
        'link',
        'image',
      ]    

    return (
        <>
            <h1>Posts</h1>

            <div>
                {userRole === 'admin' && (<Button variant="primary" onClick={openModal}>Create Post</Button> )}
                
                <Modal
                    show={modalisOpen} 
                    onHide={closeModal}
                    centered
                    size="lg"
                    >
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
                <Modal show={showDetailModal} onHide={handleDetailClose} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Post Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {postDetails ? (
                            <div>
                                <h3>{postDetails.title}</h3>
                                <div dangerouslySetInnerHTML={{ __html: postDetails.content }} /> 
                                {postDetails.image && (
                                    <img src={postDetails.image} alt="Post" style={{ maxWidth: '100%' }} />
                                )}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                        <hr />
                        <h3>Comments</h3>
                        <hr />
                        {comments.map((comment) => (
                            <div key={comment.id}>
                                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                                <span className={styles.commentsMapInfo}><DateConvert dateString={comment.created_at} />from {comment.author}</span>
                                <hr />
                            </div>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleDetailClose}>
                        Close
                        </Button>
                        { token && (
                            <form onSubmit={handleCommentSubmit}>
                            <ReactQuill
                                value={newComment}
                                onChange={setNewComment}
                                modules={modules}
                                formats={formats}
                                theme="snow"
                                placeholder="Write something amazing..."
                            />
                            <button type="submit">Add Comment</button>
                        </form>
                        )}
                    </Modal.Footer>
                </Modal>
            </div>

            <div>
                {posts.map((post) => (
						<div key={post.id}>
								<h3 onClick={() => handleDetailShow(post.id)}>{post.title}</h3>
								<img className={styles.postImage} src={post.image} alt={post.title} onClick={() => handleDetailShow(post.id)}/>
								<p><DateConvert dateString={post.created_at} /> from <strong>{post.author}</strong></p>
								<Button variant="primary" onClick={() => handleDetailShow(post.id)}>Open Post</Button>
                                
								{ userRole === 'admin' && ( 
                                <>
                                    <Button variant="primary" onClick={() => handleEditShow(post.id)}>Edit</Button>
								    <Button variant="danger"  onClick={() => deletePost(post.id)}>Delete</Button>
                                </>
                                )}
								<hr></hr>
                        </div>
                        ))}
            </div>
        </>
    );
}

export default Posts;
