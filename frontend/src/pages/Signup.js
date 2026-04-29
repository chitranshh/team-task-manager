import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('member');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/auth/signup', { name, email, password, role });
            navigate('/login');
        } catch (err) {
            setError(err.response?.data?.error || 'Signup failed');
        }
    };

    return (
        <div className="app-container">
            <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
                <div className="nav">
                    <h2>Create Account</h2>
                    <Link to="/login" className="link">Login</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    <select value={role} onChange={e => setRole(e.target.value)}>
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>
                    <div className="row">
                        <button type="submit">Signup</button>
                        <Link to="/login"><button type="button" className="secondary">Back to Login</button></Link>
                    </div>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}
