import { Router } from "express";
import { BoardController } from "../controller/BoardController";
import { CommentController } from "../controller/CommentController";
import image from './image';
import admin from './admin';

const routes = Router();

routes.post('/board', BoardController.addBoard);
routes.put('/board', BoardController.modifyBoard);
routes.delete('/board', BoardController.removeBoard);
routes.get('/boards', BoardController.findAllBoard);
routes.get('/board/count', BoardController.countBoard);
routes.get('/board/:id', BoardController.findOneBoard);

routes.use('/image', image);
routes.use('/admin', admin);

routes.post('/comment', CommentController.addComment);
routes.get('/comments', CommentController.findAllComment);
routes.get('/comment', CommentController.findOneComment);
routes.put('/comment', CommentController.modifyComment);
routes.delete('/comment', CommentController.removeComment);

export default routes;