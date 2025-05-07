import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PostEdit = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`/api/posts/${id}`, { title, content })
      .then(() => navigate(`/posts/${id}`))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>✏️ 글 수정</h2>
      <form onSubmit={handleUpdate}>
        <input 
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <br/>
        <textarea 
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
        <br/>
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
};

export default PostEdit;
