import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/posts', { title, content })
      .then(() => navigate('/posts'))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>✍️ 새 글 작성</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          placeholder="제목"
          required 
        />
        <br/>
        <textarea 
          value={content} 
          onChange={e => setContent(e.target.value)} 
          placeholder="내용"
          required 
        />
        <br/>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default PostForm;
