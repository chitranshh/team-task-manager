import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

export default function Dashboard() {
    const [stats, setStats] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/dashboard')
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load dashboard');
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="app-container"><p>Loading...</p></div>;
    if (error) return <div className="app-container"><p className="error">{error}</p></div>;
    if (!stats) return <div className="app-container"><p>No data</p></div>;

    const StatCard = ({ icon, label, value, color }) => (
        <div style={{ background: color, color: 'white', padding: '20px', borderRadius: '8px', flex: 1 }}>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{value}</div>
            <div style={{ fontSize: '14px', opacity: 0.9 }}>{icon} {label}</div>
        </div>
    );

    return (
        <div className="app-container">
            <h2>Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <StatCard icon="" label="Total Tasks" value={stats.total} color="#3b82f6" />
                <StatCard icon="" label="To Do" value={stats.todo} color="#f59e0b" />
                <StatCard icon="" label="In Progress" value={stats.inProgress} color="#8b5cf6" />
                <StatCard icon="" label="Done" value={stats.done} color="#10b981" />
                <StatCard icon="" label="Overdue" value={stats.overdue} color="#ef4444" />
            </div>

            {stats.overdueTasks && stats.overdueTasks.length > 0 && (
                <div className="card">
                    <h3>Overdue Tasks</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {stats.overdueTasks.map(t => (
                            <li key={t._id} style={{ padding: '10px', background: '#fef2f2', marginBottom: '8px', borderLeft: '4px solid #ef4444', borderRadius: '4px' }}>
                                <strong>{t.title}</strong>
                                <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                                    Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : 'N/A'}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
