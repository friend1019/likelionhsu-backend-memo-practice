import React from 'react';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📝 멋쟁이사자처럼 백엔드 테스트</h2>

      <div style={styles.buttonBox}>
        <Link to="/posts" style={styles.button}>📄 글 목록 보기(GET)</Link>
        <Link to="/posts/new" style={styles.button}>✍️ 새 글 작성하기(POST)</Link>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '30px',
  },
  buttonBox: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  button: {
    padding: '12px 20px',
    textDecoration: 'none',
    border: '2px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    color: '#333',
    fontWeight: 'bold',
    transition: '0.2s',
  }
};

export default Main;
