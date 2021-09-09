import { Router } from "express";
import image from './image';
import admin from './admin';
import auth from './auth';
import board from './board';
import comment from './comment';
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const routes = Router();

routes.use('/board', board);

routes.use('/image', image);

routes.use('/auth', auth);

routes.use('/comment', comment);

routes.use('/admin', AuthMiddleware.verifyToken, AuthMiddleware.hasRole, admin);

export default routes;