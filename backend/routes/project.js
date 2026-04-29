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
        // Show all projects to all authenticated users for team collaboration
        const projects = await Project.find({});
        res.json(projects);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add/remove members, update project, delete project (Admin only) - implement as needed

export default router;
