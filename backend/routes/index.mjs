import { Router } from "express";
import userRouter from "./userRouter.mjs";
import clickRouter from "./clickerRouter.mjs";
import { limit, limitCLicks } from "../middleware/Limit.mjs";
import { authToken } from "../middleware/Token.mjs";

const router = Router();
router.use('/user',limit,userRouter);
router.use('/clicker',limitCLicks,authToken,clickRouter);

export default router;