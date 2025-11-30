import { Router } from "express";
import { authGuard } from "../middleware/authGuard.js";
import  { validate }  from "../middleware/validate.js";
import { createPost, getCreatePostPage, getOnePost, deletePost, getEditPage, editPost, likePost, commentPost } from "../controllers/posts.controller.js";
import { postUpdate, postValidate } from "../validations/post.validation.js"

export const PostRouter = Router()
PostRouter.get('/new', authGuard, getCreatePostPage)
PostRouter.post('/new', authGuard, validate(postValidate), createPost)
PostRouter.get('/:id', authGuard, getOnePost)
PostRouter.post('/:id/delete', authGuard, deletePost)
PostRouter.get("/:id/edit", getEditPage)
PostRouter.post("/:id/like", authGuard, likePost)
PostRouter.post('/:id/comments', authGuard, commentPost)
PostRouter.post('/:id/edit',authGuard, validate(postUpdate), editPost)
