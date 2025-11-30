import { MainController } from "./MainController.js"
const userController = MainController("users")
export const { getAll, getOne, createOne, updateOne, deleteOne, search } = userController