import React from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Components/Home';
import Nav from './Components/Nav';
import { Toaster } from 'react-hot-toast';
import Profile from './Components/Profile';

const App = () => {

  return (
    <>
    <Nav/>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/home" element={<Home />} />
       <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
    </Routes>
    <Toaster/>
    </>
  );
};

export default App;
