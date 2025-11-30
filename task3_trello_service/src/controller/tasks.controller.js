import { MainController } from "./MainController.js"
const taskController = MainController("tasks")
export const { getAll, getOne, createOne, updateOne, deleteOne, search } = taskController