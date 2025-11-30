import { Router } from "express"
import { getAll, getOne, createOne, updateOne, deleteOne, search } from "../controller/columns.controller.js"
import { validate } from "../validations/validate.js"
import { validateColumn, validateColumnUpdate } from "../validations/columns.validator.js"

const ColumnRouter = Router()
ColumnRouter.get("/search", search)
ColumnRouter.get("/", getAll)
ColumnRouter.get("/:id", getOne)
ColumnRouter.post("/", validate(validateColumn), createOne)
ColumnRouter.put("/:id", validate(validateColumnUpdate), updateOne)
ColumnRouter.delete("/:id", deleteOne)

export default ColumnRouter