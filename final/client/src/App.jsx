import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/dashboard';
import Trainees from './pages/Trainees';
import Parents from './pages/Parents';
import Trades from './pages/Trades';
import Report from './pages/Report';

function PrivateRoute({ children }) {
  const user = sessionStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/trainees" element={<PrivateRoute><Trainees /></PrivateRoute>} />
        <Route path="/parents" element={<PrivateRoute><Parents /></PrivateRoute>} />
        <Route path="/trades" element={<PrivateRoute><Trades /></PrivateRoute>} />
        <Route path="/report" element={<PrivateRoute><Report /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;