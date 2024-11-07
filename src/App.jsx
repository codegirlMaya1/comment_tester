import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CommentForm from './components/CommentForm';
import './App.css';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comments" element={<CommentForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
