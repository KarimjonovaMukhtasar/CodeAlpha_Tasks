import { Router } from "express";
import { BoardController } from "../controller/boards.controller.js";
import { validate } from "../validations/validate.js";
import { validateBoardName } from "../validations/boards.validator.js";

const BoardRouter = Router();
BoardRouter.post("/", validate(validateBoardName), BoardController.createOne);
BoardRouter.get("/search", BoardController.search);
BoardRouter.get("/", BoardController.getAll);
BoardRouter.get("/:id", BoardController.getOne);
BoardRouter.put("/:id", validate(validateBoardName), BoardController.updateOne);
BoardRouter.delete("/:id", BoardController.deleteOne);

export default BoardRouter;
