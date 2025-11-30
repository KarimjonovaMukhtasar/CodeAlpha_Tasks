import { Router } from "express";
import { authGuard } from "../middleware/authGuard.js";
import {getAllUsers, getOneUser, followUser, unfollowUser} from "../controllers/user.controller.js"

export const UserRouter = Router()
UserRouter.get("/", authGuard, getAllUsers)
UserRouter.get('/:username', authGuard, getOneUser)
UserRouter.post('/:username/follow', authGuard, followUser)
UserRouter.post('/:username/unfollow', authGuard, unfollowUser)