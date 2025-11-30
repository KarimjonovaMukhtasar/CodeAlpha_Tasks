import { Router } from "express"
import { getAll, getOne, createOne, updateOne, deleteOne, search } from "../controller/users.controller.js"
import { validate } from "../validations/validate.js"
import { validateUserInfo, validateUserUpdate } from "../validations/users.validator.js"

const UserRouter = Router()
UserRouter.get("/search", search)
UserRouter.get("/", getAll)
UserRouter.get("/:id", getOne)
UserRouter.post("/", validate(validateUserInfo), createOne)
UserRouter.put("/:id", validate(validateUserUpdate), updateOne)
UserRouter.delete("/:id", deleteOne)

export default UserRouter