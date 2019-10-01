import express from 'express';
import AuthController from '../Controllers/AuthController';

const routes = express.Router();

routes.post('/signup', AuthController.signUp)
routes.post('/login', AuthController.login)

export default routes;