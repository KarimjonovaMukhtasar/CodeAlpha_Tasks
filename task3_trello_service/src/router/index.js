import { Router } from "express"
import express from "express"
import UserRouter from "./users.router.js"
import BoardRouter from "./boards.router.js"
import TaskRouter from "./tasks.router.js"
import SetupRouter from "./setup.router.js"
import ColumnRouter from "./columns.router.js"
import TerminateRouter from "./terminate.router.js"
import LoginRouter from "./login.router.js"
import RegisterRouter from "./register.router.js"

const MainRouter = Router()
MainRouter.use(express.json())
MainRouter.use("/boards", BoardRouter)
MainRouter.use("/login", LoginRouter)
MainRouter.use("/register", RegisterRouter)
MainRouter.use("/setup", SetupRouter)
MainRouter.use("/terminate", TerminateRouter)
MainRouter.use("/users", UserRouter)
MainRouter.use("/tasks", TaskRouter)
MainRouter.use("/columns", ColumnRouter)

export default MainRouter