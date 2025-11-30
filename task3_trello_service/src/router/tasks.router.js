import { Router } from "express"
import { getAll, getOne, createOne, updateOne, deleteOne, search } from "../controller/tasks.controller.js"
import { validate } from "../validations/validate.js"
import { validateTaskInfo, validateTaskUpdate } from "../validations/tasks.validator.js"

const TaskRouter = Router()
TaskRouter.get("/search", search)
TaskRouter.get("/", getAll)
TaskRouter.get("/:id", getOne)
TaskRouter.post("/", validate(validateTaskInfo), createOne)
TaskRouter.put("/:id", validate(validateTaskUpdate), updateOne)
TaskRouter.delete("/:id", deleteOne)

export default TaskRouter