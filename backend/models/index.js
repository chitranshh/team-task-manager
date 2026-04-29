import mongoose from 'mongoose';
import User from './user.js';
import Project from './project.js';
import Task from './task.js';

const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
};

export { connectDB, User, Project, Task };
