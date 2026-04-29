import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const res = await axios.get('/api/projects');
            setProjects(res.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load projects');
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await axios.post('/api/projects', { name, description });
            setName('');
            setDescription('');
            setShowForm(false);
            loadProjects();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create project');
        }
    };

    if (loading) return <div className="app-container"><p>Loading...</p></div>;

    return (
        <div className="app-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2>Projects</h2>
                {user?.role === 'admin' && (
                    <button onClick={() => setShowForm(!showForm)} style={{ background: '#10b981', padding: '10px 16px' }}>
                        {showForm ? '✕ Cancel' : '+ New Project'}
                    </button>
                )}
            </div>

            {showForm && user?.role === 'admin' && (
                <div className="card" style={{ marginBottom: '20px' }}>
                    <form onSubmit={handleCreate}>
                        <input
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Project name"
                            required
                        />
                        <textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="What's this about?"
                            rows="3"
                        />
                        <div className="row">
                            <button type="submit">Create</button>
                            <button type="button" className="secondary" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {error && <p className="error">{error}</p>}

            {projects.length === 0 ? (
                <div className="card"><p style={{ textAlign: 'center', color: '#6b7280' }}>No projects yet</p></div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                    {projects.map(p => (
                        <div key={p._id} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s', borderLeft: '4px solid #3b82f6' }}>
                            <h3>{p.name}</h3>
                            <p style={{ color: '#6b7280', fontSize: '14px', margin: '8px 0' }}>{p.description}</p>
                            <button onClick={() => navigate(`/tasks/${p._id}`)} style={{ width: '100%', marginTop: '12px' }}>
                                View Tasks →
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
