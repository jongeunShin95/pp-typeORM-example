import { Router } from "express";
import { BoardController } from "../controller/BoardController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

const routes = Router();
routes.post('', AuthMiddleware.verifyToken, BoardController.addBoard);
routes.put('', AuthMiddleware.verifyToken, BoardController.modifyBoard);
routes.delete('', AuthMiddleware.verifyToken, BoardController.removeBoard);
routes.get('/list', BoardController.findAllBoard);
routes.get('/count', BoardController.countBoard);
routes.get('/:id', BoardController.findOneBoard);

export default routes;