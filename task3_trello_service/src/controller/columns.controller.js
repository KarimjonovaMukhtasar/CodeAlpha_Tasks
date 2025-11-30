import { MainController } from "./MainController.js"
const columnsController = MainController("columns")
export const { getAll, getOne, createOne, updateOne, deleteOne, search } = columnsController