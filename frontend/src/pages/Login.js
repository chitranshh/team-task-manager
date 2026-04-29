import React, { useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../utils/auth';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', { email, password });
            login(res.data);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    return (
        <div className="app-container">
            <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
                <div className="nav">
                    <h2>Login</h2>
                    <Link to="/signup" className="link">Sign up</Link>
                </div>
                <form onSubmit={handleSubmit}>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    <div className="row">
                        <button type="submit">Login</button>
                        <Link to="/signup"><button type="button" className="secondary">Create Account</button></Link>
                    </div>
                </form>
                {error && <p className="error">{error}</p>}
                <p className="small">Don't have an account? <Link to="/signup" className="link">Sign up here</Link></p>
            </div>
        </div>
    );
}
