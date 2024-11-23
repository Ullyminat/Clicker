import { Router } from "express";
import clickerController from "../controller/clickerController.mjs";

const clickRouter = Router();
clickRouter.post('/click',clickerController.click);
clickRouter.post('/buy',clickerController.buyAutoclicker);

export default clickRouter;