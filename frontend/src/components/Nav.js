import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

export default function Nav() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div style={{ background: '#2563eb', color: 'white', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h3 style={{ margin: 0, cursor: 'pointer' }} onClick={() => navigate('/dashboard')}>
                    Team Task Manager
                </h3>
            </div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                    Dashboard
                </button>
                <button onClick={() => navigate('/projects')} style={{ background: 'transparent', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px' }}>
                    Projects
                </button>
                <span style={{ fontSize: '14px' }}>({user?.name})</span>
                <button onClick={handleLogout} style={{ background: '#ef4444', padding: '8px 12px', borderRadius: '6px', border: 'none', color: 'white', cursor: 'pointer', fontSize: '14px' }}>
                    Logout
                </button>
            </div>
        </div>
    );
}
