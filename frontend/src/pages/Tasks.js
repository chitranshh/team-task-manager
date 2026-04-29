import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../utils/auth';
import { useParams, useNavigate } from 'react-router-dom';

export default function Tasks() {
    const { user } = useAuth();
    const { projectId } = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedToId, setAssignedToId] = useState('');
    const [status, setStatus] = useState('todo');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadTasks();
    }, [projectId]);

    const loadTasks = async () => {
        try {
            const res = await axios.get(`/api/tasks/project/${projectId}`);
            setTasks(res.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load tasks');
            setLoading(false);
        }
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        try {
            await axios.post('/api/tasks', { title, description, assignedTo: assignedToId, status, dueDate, project: projectId });
            setTitle('');
            setDescription('');
            setAssignedToId('');
            setStatus('todo');
            setDueDate('');
            setShowForm(false);
            loadTasks();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to create task');
        }
    };

    const handleStatus = async (id, newStatus) => {
        try {
            await axios.patch(`/api/tasks/${id}/status`, { status: newStatus });
            loadTasks();
        } catch (err) {
            setError('Failed to update status');
        }
    };

    const getStatusColor = (st) => {
        switch (st) {
            case 'todo': return '#f59e0b';
            case 'in-progress': return '#8b5cf6';
            case 'done': return '#10b981';
            default: return '#6b7280';
        }
    };

    if (loading) return <div className="app-container"><p>Loading...</p></div>;

    return (
        <div className="app-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <button onClick={() => navigate('/projects')} style={{ background: 'transparent', color: '#3b82f6', border: 'none', cursor: 'pointer', marginRight: '12px', fontSize: '16px' }}>
                        ← Back
                    </button>
                    <h2 style={{ display: 'inline' }}>Tasks</h2>
                </div>
                {user?.role === 'admin' && (
                    <button onClick={() => setShowForm(!showForm)} style={{ background: '#10b981', padding: '10px 16px' }}>
                        {showForm ? '✕ Cancel' : '+ New Task'}
                    </button>
                )}
            </div>

            {showForm && user?.role === 'admin' && (
                <div className="card" style={{ marginBottom: '20px' }}>
                    <form onSubmit={handleCreate}>
                        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Task name" required />
                        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Details" rows="2" />
                        <input value={assignedToId} onChange={e => setAssignedToId(e.target.value)} placeholder="Assign to (optional)" />
                        <select value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                        <div className="row">
                            <button type="submit">Create</button>
                            <button type="button" className="secondary" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            {error && <p className="error">{error}</p>}

            {tasks.length === 0 ? (
                <div className="card"><p style={{ textAlign: 'center', color: '#6b7280' }}>No tasks yet</p></div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {tasks.map(t => (
                        <div key={t._id} className="card" style={{ borderLeft: `4px solid ${getStatusColor(t.status)}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 6px 0' }}>{t.title}</h3>
                                {t.description && <p style={{ color: '#6b7280', fontSize: '14px', margin: '4px 0' }}>{t.description}</p>}
                                <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#6b7280', marginTop: '8px' }}>
                                    <span style={{ background: getStatusColor(t.status), color: 'white', padding: '4px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                                        {t.status === 'in-progress' ? 'In Progress' : t.status === 'todo' ? 'To Do' : 'Done'}
                                    </span>
                                    {t.dueDate && <span>Due: {new Date(t.dueDate).toLocaleDateString()}</span>}
                                </div>
                            </div>
                            {(user?.role === 'admin' || String(t.assignedTo) === user?.id) && (
                                <div style={{ display: 'flex', gap: '8px', marginLeft: '12px' }}>
                                    {t.status !== 'todo' && <button onClick={() => handleStatus(t._id, 'todo')} style={{ padding: '6px 10px', fontSize: '13px' }}>To Do</button>}
                                    {t.status !== 'in-progress' && <button onClick={() => handleStatus(t._id, 'in-progress')} style={{ padding: '6px 10px', fontSize: '13px' }}>In Progress</button>}
                                    {t.status !== 'done' && <button onClick={() => handleStatus(t._id, 'done')} style={{ padding: '6px 10px', fontSize: '13px' }}>Done</button>}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
