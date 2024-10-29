import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const CreatePost = () => {
  // State for title, content, and image
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quill modules configuration (toolbar customization)
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

  // Handle image file selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      // Send form data to Django API
      const response = await axios.post('/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${localStorage.getItem('token')}`, // Example for protected route
        },
      });
      console.log('Post created:', response.data);
      // Clear form after submission
      setTitle('');
      setContent('');
      setImage(null);
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Failed to create post.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Content</label>
          <ReactQuill
            value={content}
            onChange={setContent}
            modules={modules}
            placeholder="Write something amazing..."
          />
        </div>
        <div>
          <label>Image</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Posting...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;