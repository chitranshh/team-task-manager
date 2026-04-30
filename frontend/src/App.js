import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import ProjectSettings from './pages/ProjectSettings';
import Tasks from './pages/Tasks';
import Nav from './components/Nav';
import { AuthProvider, useAuth } from './utils/auth';

function PrivateRoute({ children }) {
    const { user } = useAuth();
    return user ? (
        <>
            <Nav />
            {children}
        </>
    ) : <Navigate to="/login" />;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
                    <Route path="/project-settings/:projectId" element={<PrivateRoute><ProjectSettings /></PrivateRoute>} />
                    <Route path="/tasks/:projectId" element={<PrivateRoute><Tasks /></PrivateRoute>} />
                    <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
