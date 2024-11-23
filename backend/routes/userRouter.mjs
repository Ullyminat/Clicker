import { Router } from "express";
import UserController from "./../controller/userController.mjs"

const userRouter = Router();
userRouter.post('/create',UserController.create);
userRouter.post('/login',UserController.login);
userRouter.get('/load', UserController.load)

export default userRouter;