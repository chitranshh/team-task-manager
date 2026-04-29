import express from 'express';
import { Task, Project } from '../models/index.js';
import { authenticate } from './middleware.js';

const router = express.Router();

// Dashboard: tasks, status, overdue
router.get('/', authenticate, async (req, res) => {
    try {
        // Find all projects where user is a member or creator
        const projects = await Project.find({
            $or: [
                { createdBy: req.user.id },
                { members: req.user.id },
            ],
        });
        const projectIds = projects.map(p => p._id);
        const tasks = await Task.find({ project: { $in: projectIds } });
        const overdue = tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done');
        res.json({
            total: tasks.length,
            todo: tasks.filter(t => t.status === 'todo').length,
            inProgress: tasks.filter(t => t.status === 'in-progress').length,
            done: tasks.filter(t => t.status === 'done').length,
            overdue: overdue.length,
            overdueTasks: overdue,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
