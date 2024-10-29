import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = '/posts/';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({ title: '', content: '' });
    const [editingPost, setEditingPost] = useState(null);

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
            const response = await axios.post(API_URL, newPost, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('token')}`
                },
            });
            setPosts([...posts, response.data]);
            setNewPost({ title: '', content: '' });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };

    // Update an existing post
    const updatePost = async (postId) => {
        try {
            const response = await axios.put(`${API_URL}${postId}/`, editingPost);
            setPosts(posts.map((post) => (post.id === postId ? response.data : post)));
            setEditingPost(null);
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };

    // Delete a post
    const deletePost = async (postId) => {
        try {
            await axios.delete(`${API_URL}${postId}/`);
            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    return (
        <div>
            <h1>Posts</h1>

            <div>
                <h2>Create New Post</h2>
                <input
                    type="text"
                    placeholder="Title"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                />
                <textarea
                    placeholder="Content"
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                />
                <button onClick={createPost}>Create</button>
            </div>

            <div>
                <h2>All Posts</h2>
                {posts.map((post) => (
                    <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                        {editingPost && editingPost.id === post.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingPost.title}
                                    onChange={(e) =>
                                        setEditingPost({ ...editingPost, title: e.target.value })
                                    }
                                />
                                <textarea
                                    value={editingPost.content}
                                    onChange={(e) =>
                                        setEditingPost({ ...editingPost, content: e.target.value })
                                    }
                                />
                                <button onClick={() => updatePost(post.id)}>Save</button>
                                <button onClick={() => setEditingPost(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3>{post.title}</h3>
                                <p>{post.content}</p>
                                <img src={post.image} alt={post.title} />
                                <button onClick={() => setEditingPost(post)}>Edit</button>
                                <button onClick={() => deletePost(post.id)}>Delete</button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Posts;