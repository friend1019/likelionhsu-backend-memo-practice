import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams(); // memoId
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState(null);
  const [editContent, setEditContent] = useState('');

  // ✅ 댓글 목록 불러오기 (memoId 쿼리 파라미터로 전달)
  const fetchComments = useCallback(() => {
    axios.get(`/api/comments?memoId=${id}`)
      .then(res => setComments(res.data))
      .catch(err => console.error(err));
  }, [id]);

  useEffect(() => {
    axios.get(`/api/memo/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));

    fetchComments();
  }, [id, fetchComments]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/comments/${id}`, { content: newComment })
      .then(() => {
        setNewComment('');
        fetchComments();
      })
      .catch(err => console.error(err));
  };

  const handleCommentDelete = (commentId) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      axios.delete(`/api/comments/${id}/${commentId}`)
        .then(() => fetchComments())
        .catch(err => console.error(err));
    }
  };

  const handleCommentEdit = (commentId, currentContent) => {
    setEditCommentId(commentId);
    setEditContent(currentContent);
  };

  const handleCommentUpdate = (e) => {
    e.preventDefault();
    axios.put(`/api/comments/${id}/${editCommentId}`, { content: editContent })
      .then(() => {
        setEditCommentId(null);
        setEditContent('');
        fetchComments();
      })
      .catch(err => console.error(err));
  };

  const handleDeletePost = () => {
    if (window.confirm('글을 삭제하시겠습니까?')) {
      axios.delete(`/api/memo/${id}`)
        .then(() => navigate('/posts'))
        .catch(err => console.error(err));
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <Link to={`/posts/${id}/edit`}><button>✏️ 수정(PUT)</button></Link>
      <button onClick={handleDeletePost}>🗑️ 삭제(DELETE)</button>

      <h3>💬 댓글</h3>
      <ul>
        {comments.map(c => (
          <li key={c.id}>
            {editCommentId === c.id ? (
              <form onSubmit={handleCommentUpdate}>
                <input 
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  required
                />
                <button type="submit">✅ 저장</button>
                <button type="button" onClick={() => setEditCommentId(null)}>❌ 취소</button>
              </form>
            ) : (
              <>
                {c.content}
                <button onClick={() => handleCommentEdit(c.id, c.content)}>✏️</button>
                <button onClick={() => handleCommentDelete(c.id)}>🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <input 
          type="text" 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글 입력"
          required
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default PostDetail;
