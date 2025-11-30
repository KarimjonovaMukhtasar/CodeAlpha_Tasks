import { Router } from "express"
import { validate } from "../validations/validate.js"
import { loginUser } from "../controller/login.controller.js"
import { validateLogin } from "../validations/auth.validator.js"

const LoginRouter = Router()
LoginRouter.post("/", validate(validateLogin), loginUser)

export default LoginRouter