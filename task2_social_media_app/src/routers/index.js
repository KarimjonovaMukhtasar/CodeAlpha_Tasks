import { Router } from "express"
import {getMe} from "../controllers/auth.controller.js"
import { getHomePage } from "../controllers/posts.controller.js"
import { AuthRouter } from "./auth.router.js"
import {authGuard} from "../middleware/authGuard.js"
import {PostRouter} from "./post.router.js"
import { UserRouter } from "./user.router.js"

export const mainRouter = Router()
mainRouter.use('/home', getHomePage)
mainRouter.use('/profile', authGuard, getMe)
mainRouter.use('/auth', AuthRouter)
mainRouter.use('/posts', PostRouter)
mainRouter.use('/users', UserRouter)