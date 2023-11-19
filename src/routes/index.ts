import { Router } from "express";
import IndexController from "../controllers/appController";
import multer from "multer";
import multerConfig from "../config/multerConfig";

const upload = multer(multerConfig);
const routes = Router();

const indexController = new IndexController();

routes.post('/', upload.single('grafo'), indexController.execute);

export default routes;