import { Router } from "express";
import { AdminController } from "../controller/AdminController";

const routes = Router();
routes.get('/dashboard', AdminController.getDashboard);

export default routes;