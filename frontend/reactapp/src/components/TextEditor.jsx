import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import the styles

const Editor = () => {
  const [content, setContent] = useState('');

  const handleChange = (value) => {
    setContent(value);
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link', 'image'],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link', 'image', 'color', 'align'
  ];

  return (
    <div>
      <ReactQuill value={content} onChange={handleChange} modules={modules} theme="snow" formats={formats} />
    </div>
  );
};

export default Editor;
