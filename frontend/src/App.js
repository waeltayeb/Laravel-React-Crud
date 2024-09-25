import React from 'react';

import Home from './components/home';
import Create from './components/create';
import Edit from './components/edit';
import {  BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export default function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
      <Route path="/edit/:id" element={<Edit />} />
    </Routes>
   </Router>
    
  )
}