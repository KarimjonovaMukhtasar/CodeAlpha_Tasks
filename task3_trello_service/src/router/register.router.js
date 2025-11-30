import { Router } from "express"
import { registerUser } from "../controller/register.controller.js"
import { validate } from "../validations/validate.js"
import { validateRegister } from "../validations/auth.validator.js"

const RegisterRouter = Router()
RegisterRouter.post("/", validate(validateRegister), registerUser)


export default RegisterRouter 