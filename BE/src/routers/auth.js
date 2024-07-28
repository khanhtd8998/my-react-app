import { Router } from "express";
import { signin, signup } from "../controllers/auth";
import { getAllUsers, getMe, getUser } from "../controllers/user";
import { authMiddleware } from "../middleware/checkAuth";

const authRouter = Router();
authRouter.get('/auth', getAllUsers)
authRouter.post('/auth/signup', signup)
authRouter.post('/auth/signin', signin)

authRouter.use('/', authMiddleware)
authRouter.get('/auth/get-me', getMe, getUser)

export default authRouter