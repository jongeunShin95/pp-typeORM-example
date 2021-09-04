import { Router } from "express";
import { BoardController } from "../controller/BoardController";

const routes = Router();

routes.post('/board', BoardController.addBoard);
routes.put('/board', BoardController.modifyBoard);
routes.delete('/board', BoardController.removeBoard);
routes.get('/boards', BoardController.findAllBoard);
routes.get('/board/count', BoardController.countBoard);
routes.get('/board/:id', BoardController.findOneBoard);

export default routes;