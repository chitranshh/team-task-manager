import express from 'express';
import { Task, Project, User } from '../models/index.js';
import { authenticate } from './middleware.js';

const router = express.Router();


router.post('/', authenticate, async (req, res) => {
    const { title, description, status, dueDate, assignedTo, project } = req.body;
    try {
        if (req.user.role !== 'admin') return res.sendStatus(403);
        const taskData = { title, description, status, dueDate, project };
        if (assignedTo && assignedTo.trim()) taskData.assignedTo = assignedTo;
        const task = new Task(taskData);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all tasks for a project (members and admins)
router.get('/project/:projectId', authenticate, async (req, res) => {
    try {
        const tasks = await Task.find({ project: req.params.projectId });
        res.json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update task status (assigned member or admin)
router.patch('/:id/status', authenticate, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.sendStatus(404);
        if (req.user.role !== 'admin' && String(task.assignedTo) !== req.user.id) return res.sendStatus(403);
        task.status = req.body.status;
        await task.save();
        res.json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
