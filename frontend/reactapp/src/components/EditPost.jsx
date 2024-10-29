import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const EditPost = ({ postId, onClose }) => {
  const [post, setPost] = useState({ title: '', content: '', image: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fetch the post data for editing
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${postId}/`);
        setPost(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [postId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    
    if (post.image) {
        formData.append('image', post.image);
    }
    else {
        formData.append('image', '');
    }

    try {
      const response = await axios.put(`/update/${postId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      console.log('Post updated:', response.data);
      alert('Post updated successfully!');
      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <ReactQuill
            value={post.content}
            onChange={(value) => setPost({ ...post, content: value })}
            modules={modules}
            placeholder="Write something amazing..."
            theme="snow"
            style={{height: '400px', width: '100%', marginBottom: '100px' }}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <img src={post.image} alt="Post Image" width="200" height="150" />
          <br />
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={(e) => setPost({ ...post, image: e.target.files[0] })}
            accept="image/*"
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default EditPost;