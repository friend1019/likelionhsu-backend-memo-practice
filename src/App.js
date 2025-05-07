import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './Main';
import PostsList from './PostList';
import PostForm from './PostForm';
import PostDetail from './PostDetail';
import PostEdit from './PostEdit';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/new" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={<PostEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
