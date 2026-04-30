import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/auth';

export default function ProjectSettings() {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [project, setProject] = useState(null);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (user?.role !== 'admin') {
            navigate('/projects');
            return;
        }
        loadProject();
    }, []);

    const loadProject = async () => {
        try {
            const [projectRes, usersRes] = await Promise.all([
                axios.get(`/api/projects/${projectId}`),
                axios.get('/api/projects/users/list')
            ]);
            setProject(projectRes.data);
            setAllUsers(usersRes.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to load project settings');
            setLoading(false);
        }
    };

    const handleAddMember = async (e) => {
        e.preventDefault();
        if (!selectedUserId) return;
        try {
            const res = await axios.post(`/api/projects/${projectId}/members`, { memberId: selectedUserId });
            setProject(res.data);
            setSelectedUserId('');
            setSuccess('Member added successfully');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add member');
        }
    };

    const handleRemoveMember = async (memberId) => {
        if (!window.confirm('Remove this member from the project?')) return;
        try {
            const res = await axios.delete(`/api/projects/${projectId}/members/${memberId}`);
            setProject(res.data);
            setSuccess('Member removed successfully');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to remove member');
        }
    };

    if (loading) return <div className="app-container"><p>Loading...</p></div>;
    if (!project) return <div className="app-container"><p className="error">Project not found</p></div>;

    // Get available users (not already members and not the creator)
    const availableUsers = allUsers.filter(u => 
        !project.members.some(m => m._id === u._id) && u._id !== project.createdBy
    );

    return (
        <div className="app-container">
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => navigate('/projects')} style={{ background: '#6b7280', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    ← Back to Projects
                </button>
            </div>

            <h2>Project Settings: {project.name}</h2>

            {error && <p className="error">{error}</p>}
            {success && <p style={{ color: '#10b981', marginBottom: '16px' }}>{success}</p>}

            <div className="card" style={{ marginBottom: '20px' }}>
                <h3>Project Members</h3>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
                    Total Members: {project.members.length}
                </p>

                {project.members.length === 0 ? (
                    <p style={{ color: '#9ca3af', fontStyle: 'italic' }}>No members added yet</p>
                ) : (
                    <div style={{ marginBottom: '16px' }}>
                        {project.members.map(member => (
                            <div key={member._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f3f4f6', borderRadius: '4px', marginBottom: '8px' }}>
                                <div>
                                    <p style={{ margin: '0', fontWeight: '500' }}>{member.name}</p>
                                    <p style={{ margin: '0', fontSize: '12px', color: '#6b7280' }}>{member.email}</p>
                                    <span style={{ display: 'inline-block', fontSize: '11px', padding: '2px 6px', background: '#dbeafe', color: '#1e40af', borderRadius: '2px', marginTop: '4px' }}>
                                        {member.role}
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleRemoveMember(member._id)}
                                    style={{ padding: '6px 12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="card">
                <h3>Add New Member</h3>
                {availableUsers.length === 0 ? (
                    <p style={{ color: '#9ca3af' }}>All available users are already members</p>
                ) : (
                    <form onSubmit={handleAddMember}>
                        <select
                            value={selectedUserId}
                            onChange={e => setSelectedUserId(e.target.value)}
                            style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '4px', border: '1px solid #d1d5db' }}
                            required
                        >
                            <option value="">Select a user to add...</option>
                            {availableUsers.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.name} ({user.email}) - {user.role}
                                </option>
                            ))}
                        </select>
                        <button type="submit" style={{ background: '#10b981', color: 'white', padding: '10px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>
                            Add Member
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
