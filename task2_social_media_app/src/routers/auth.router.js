import {
  getLoginPage,
  getRegisterPage,
  login,
  register,
  logout
} from "../controllers/auth.controller.js";

import {Router} from "express"
import {validate} from "../middleware/validate.js"
import { userRegisterValidate, LoginValidate } from "../validations/auth.validation.js"
export const AuthRouter = Router()

AuthRouter.get('/login', getLoginPage)
AuthRouter.post('/login', validate(LoginValidate) , login)
AuthRouter.get('/register',  getRegisterPage)
AuthRouter.post('/register', validate(userRegisterValidate), register)
AuthRouter.get('/logout', logout)
