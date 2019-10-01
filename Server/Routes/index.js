import express from 'express';
import authRoutes from './authRoutes';

const routes = express.Router();

routes.use('/user', authRoutes);

export default routes;