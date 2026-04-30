import express from 'express';
import { Project, User } from '../models/index.js';
import { authenticate, authorizeRole } from './middleware.js';

const router = express.Router();

// Create project (Admin only)
router.post('/', authenticate, authorizeRole('admin'), async (req, res) => {
    const { name, description, memberIds } = req.body;
    try {
        const project = new Project({ name, description, createdBy: req.user.id, members: memberIds || [] });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all projects for user
router.get('/', authenticate, async (req, res) => {
    try {
        const projects = await Project.find({
            $or: [
                { createdBy: req.user.id },
                { members: req.user.id },
            ],
        });
        res.json(projects);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get project details with members info
router.get('/:id', authenticate, async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('members', 'name email role');
        if (!project) return res.status(404).json({ error: 'Project not found' });
        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add member to project (Admin only)
router.post('/:id/members', authenticate, authorizeRole('admin'), async (req, res) => {
    const { memberId } = req.body;
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        if (!project.members.includes(memberId)) {
            project.members.push(memberId);
            await project.save();
        }
        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Remove member from project (Admin only)
router.delete('/:id/members/:memberId', authenticate, authorizeRole('admin'), async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ error: 'Project not found' });
        project.members = project.members.filter(id => id.toString() !== req.params.memberId);
        await project.save();
        res.json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all users (for admin to add as members)
router.get('/users/list', authenticate, authorizeRole('admin'), async (req, res) => {
    try {
        const users = await User.find({}, 'name email role');
        res.json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
