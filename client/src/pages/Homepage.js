import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Signup from './Signup';
import LandingPage from './LandingPage';
import Login from './Login';
import App from '../App';
import SuccessModal from '../Modal/SuccessModal';



function Homepage() {
  const navigate = useNavigate();


  return (
    <div className="wrapper">
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/register"
            element={<Signup />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/dashboard"
            element={<App/>}
          />
            <Route
            path="/checkout-success"
            element={<SuccessModal/>}
          />

        </Routes>
      </main>
    </div>
  );
}

export default Homepage;
